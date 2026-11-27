// Native zero-dependency IndexedDB wrapper for CoachPR Athlete PWA
// Provides robust offline caching, idempotency queue, and background sync

const DB_NAME = 'coachpr_athlete_db';
const DB_VERSION = 1;

export interface StoredWorkout {
  id: string;
  athleteId: string;
  dayName: string;
  workoutName: string;
  exercises: {
    id: string;
    name: string;
    nameEn: string;
    targetMuscle: string;
    equipment: string;
    cues?: string;
    restSeconds: number;
    sets: {
      setNumber: number;
      targetReps: string;
      targetWeight: number;
      actualReps?: number;
      actualWeight?: number;
      actualRpe?: number;
      completed: boolean;
    }[];
  }[];
  cachedAt: string;
}

export interface PendingSyncItem {
  idempotencyKey: string;
  athleteId: string;
  type: 'WORKOUT_COMPLETION' | 'SET_UPDATE' | 'TEN_OF_TEN_SCORE';
  payload: any;
  createdAt: string;
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed';
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not available'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('workouts')) {
        db.createObjectStore('workouts', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', { keyPath: 'idempotencyKey' });
      }
      if (!db.objectStoreNames.contains('athleteProfile')) {
        db.createObjectStore('athleteProfile', { keyPath: 'athleteId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Cache current workout for offline access
 */
export async function cacheWorkoutOffline(workout: StoredWorkout): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('workouts', 'readwrite');
      const store = tx.objectStore('workouts');
      const req = store.put(workout);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to cache workout in IndexedDB:', err);
  }
}

/**
 * Get cached workout when athlete is offline in the gym
 */
export async function getCachedWorkout(workoutId: string): Promise<StoredWorkout | undefined> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('workouts', 'readonly');
      const store = tx.objectStore('workouts');
      const req = store.get(workoutId);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to retrieve workout from IndexedDB:', err);
    return undefined;
  }
}

/**
 * Queue a workout or set update while offline
 */
export async function queueOfflineOperation(item: Omit<PendingSyncItem, 'status' | 'retryCount' | 'createdAt'>): Promise<void> {
  try {
    const db = await openDatabase();
    const syncItem: PendingSyncItem = {
      ...item,
      status: 'pending',
      retryCount: 0,
      createdAt: new Date().toISOString()
    };
    return new Promise((resolve, reject) => {
      const tx = db.transaction('syncQueue', 'readwrite');
      const store = tx.objectStore('syncQueue');
      const req = store.put(syncItem);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to queue offline operation:', err);
  }
}

/**
 * Get all pending operations waiting to be synced
 */
export async function getPendingSyncOperations(athleteId?: string): Promise<PendingSyncItem[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('syncQueue', 'readonly');
      const store = tx.objectStore('syncQueue');
      const req = store.getAll();
      req.onsuccess = () => {
        let results: PendingSyncItem[] = req.result || [];
        if (athleteId) {
          results = results.filter(item => item.athleteId === athleteId);
        }
        resolve(results.filter(item => item.status !== 'syncing'));
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to get pending sync operations:', err);
    return [];
  }
}

/**
 * Mark sync operation as finished and remove from queue
 */
export async function completeSyncOperation(idempotencyKey: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('syncQueue', 'readwrite');
      const store = tx.objectStore('syncQueue');
      const req = store.delete(idempotencyKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to remove synced item:', err);
  }
}

/**
 * Replay all pending operations against backend
 */
export async function syncPendingOperations(): Promise<{ synced: number; failed: number }> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { synced: 0, failed: 0 };
  }

  const items = await getPendingSyncOperations();
  if (items.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  let failed = 0;

  for (const item of items) {
    try {
      if (item.type === 'WORKOUT_COMPLETION') {
        const res = await fetch('/api/workout/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...item.payload,
            idempotencyKey: item.idempotencyKey
          })
        });
        if (res.ok) {
          await completeSyncOperation(item.idempotencyKey);
          synced++;
        } else {
          failed++;
        }
      } else if (item.type === 'TEN_OF_TEN_SCORE') {
        const res = await fetch('/api/progress/ten-of-ten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...item.payload,
            idempotencyKey: item.idempotencyKey
          })
        });
        if (res.ok) {
          await completeSyncOperation(item.idempotencyKey);
          synced++;
        } else {
          failed++;
        }
      }
    } catch (err) {
      console.warn(`Sync failed for item ${item.idempotencyKey}:`, err);
      failed++;
    }
  }

  return { synced, failed };
}

/**
 * Clear cached data on athlete logout for privacy and isolation
 */
export async function clearAthleteOfflineData(athleteId: string): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction(['workouts', 'syncQueue', 'athleteProfile'], 'readwrite');
    const workoutStore = tx.objectStore('workouts');
    const syncStore = tx.objectStore('syncQueue');
    const profileStore = tx.objectStore('athleteProfile');

    // Get all workouts and delete ones matching athleteId
    const wReq = workoutStore.getAll();
    wReq.onsuccess = () => {
      const workouts: StoredWorkout[] = wReq.result || [];
      workouts.forEach(w => {
        if (w.athleteId === athleteId) workoutStore.delete(w.id);
      });
    };

    const sReq = syncStore.getAll();
    sReq.onsuccess = () => {
      const items: PendingSyncItem[] = sReq.result || [];
      items.forEach(s => {
        if (s.athleteId === athleteId) syncStore.delete(s.idempotencyKey);
      });
    };

    profileStore.delete(athleteId);
  } catch (err) {
    console.warn('Error clearing offline data:', err);
  }
}
