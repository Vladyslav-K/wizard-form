if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"c37dd3dd0c59c0788cf8c9a98122839b","url":"icons/code_black_18x18.png"},{"revision":"e48e2057b7007fba0b36825eeafa393f","url":"icons/code_black_192x192.png"},{"revision":"651e601f5a34c518aa4eb4bd60802585","url":"index.html"},{"revision":"d1a5d691f93cb08f96b1e5ac4e7cc245","url":"precache-manifest.d1a5d691f93cb08f96b1e5ac4e7cc245.js"},{"revision":"0203ab134630f86829f100d2ba478f95","url":"service-worker.js"},{"revision":"571048d67ecbabe789e0737b59098ce3","url":"static/css/2.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"6055dbe1b2051dfb6655740e57f26799","url":"static/js/2.7515f6c9.chunk.js"},{"revision":"28af6e43f0714cc7e8b120a4112e0997","url":"static/js/main.e74d11c6.chunk.js"},{"revision":"737c82dda7363aa6e8cd329a64d26070","url":"static/js/runtime-main.a8d095fe.js"}]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.networkFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
