// CoachPR Offline PWA Service Worker (v3.0)
// Designed for basement gym connectivity loss with automatic background sync

const CACHE_NAME = "coachpr-pwa-v3";
const OFFLINE_URL = "/app";

const PRECACHE_ASSETS = [
  "/",
  "/app",
  "/dashboard",
  "/dashboard/clients",
  "/captain/pending",
  "/login",
  "/manifest.json",
  "/brand-pr-logo.png",
  "/pr-logo.png",
  "/favicon.ico"
];

// 1. Install & Precache App Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate & Clean Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Network-First for APIs with Offline Fallback / Stale-While-Revalidate for UI
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Bypass API requests to let indexedDB/localStorage handle offline queueing
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Mobile Push Notifications
self.addEventListener("push", function (event) {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body || "لديك تذكير جديد بخصوص جدول تمرين اليوم.",
        icon: "/brand-pr-logo.png",
        badge: "/brand-pr-logo.png",
        vibrate: [200, 100, 200],
        data: {
          url: data.url || "/app",
        },
      };
      event.waitUntil(self.registration.showNotification(data.title || "CoachPR", options));
    } catch (e) {
      console.warn("Push event error:", e);
    }
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/app")
  );
});
