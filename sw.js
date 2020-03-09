if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"c37dd3dd0c59c0788cf8c9a98122839b","url":"icons/code_black_18x18.png"},{"revision":"e48e2057b7007fba0b36825eeafa393f","url":"icons/code_black_192x192.png"},{"revision":"d027521c5e30c1762047b0520e624543","url":"index.html"},{"revision":"7830af5b408c44260537d2cc716ce5f1","url":"precache-manifest.7830af5b408c44260537d2cc716ce5f1.js"},{"revision":"d410975b129171014208f088a575611c","url":"service-worker.js"},{"revision":"571048d67ecbabe789e0737b59098ce3","url":"static/css/2.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"3119e34f2eb0720e78cac1a2e91fe9b5","url":"static/js/2.d765ca88.chunk.js"},{"revision":"6af745d038a5186283c096fa3fb68d89","url":"static/js/main.162ed21b.chunk.js"},{"revision":"737c82dda7363aa6e8cd329a64d26070","url":"static/js/runtime-main.a8d095fe.js"}]);

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
