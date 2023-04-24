self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('dice-roller-cache').then((cache) => {
      return cache.addAll([
        '/Dice/',
        '/Dice/index.html',
        '/Dice/style.css',
        '/Dice/script.js',
        '/Dice/path/to/icon-192x192.png',
        '/Dice/path/to/icon-512x512.png',
      ]);
    })
  );
});