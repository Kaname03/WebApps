self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('dice-roller-cache').then((cache) => {
      return cache.addAll([
        '/Dice/',
        '/Dice/index.html',
        '/Dice/style.css',
        '/Dice/script.js',
        '/Dice/icon-192x192.png',
        '/Dice/icon-512x512.png',
      ]);
    })
  );
});