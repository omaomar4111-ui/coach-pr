// CoachPRB Advanced Offline Service Worker
// Inspired by gymcoach-app offline-first resilience architecture

const CACHE_NAME = "coachprb-offline-v2";
const OFFLINE_URL = "/app";

const PRECACHE_ASSETS = [
  "/",
  "/app",
  "/dashboard",
  "/dashboard/builder",
  "/manifest.json",
  "/pr-logo.png",
  "/favicon.ico"
];

// 1. Install & Precache Critical Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate & Purge Legacy Caches
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

// 3. Stale-While-Revalidate & Cache-First Network Fallback
self.addEventListener("fetch", (event) => {
  // Only handle GET requests for navigation and static assets
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Bypass API routes from offline cache to avoid stale DB writes
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
          // If offline and requesting navigation, return cached app
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Web Push Notification Handlers
self.addEventListener("push", function (event) {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body || "لديك تذكير جديد بخصوص جدولك التدريبي.",
        icon: "/pr-logo.png",
        badge: "/pr-logo.png",
        vibrate: [150, 50, 150],
        data: {
          dateOfArrival: Date.now(),
          url: data.url || "/app",
        },
        actions: [
          { action: "explore", title: "فتح الجدول" },
          { action: "close", title: "إغلاق" },
        ],
      };
      event.waitUntil(self.registration.showNotification(data.title || "CoachPRB", options));
    } catch (e) {
      console.warn("Push event parse notice:", e);
    }
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/app")
  );
});
