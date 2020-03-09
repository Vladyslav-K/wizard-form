if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"c37dd3dd0c59c0788cf8c9a98122839b","url":"icons/code_black_18x18.png"},{"revision":"e48e2057b7007fba0b36825eeafa393f","url":"icons/code_black_192x192.png"},{"revision":"36e14565ab02bf5291070f492931644c","url":"index.html"},{"revision":"6896d25d1c8905821969be0eb64bd0ef","url":"precache-manifest.6896d25d1c8905821969be0eb64bd0ef.js"},{"revision":"6d9f3664df99cc048f9d20b4c718846e","url":"service-worker.js"},{"revision":"571048d67ecbabe789e0737b59098ce3","url":"static/css/2.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"3119e34f2eb0720e78cac1a2e91fe9b5","url":"static/js/2.d765ca88.chunk.js"},{"revision":"f0315fe041ed8fd04df05437e09bf95b","url":"static/js/main.6bea82fe.chunk.js"},{"revision":"737c82dda7363aa6e8cd329a64d26070","url":"static/js/runtime-main.a8d095fe.js"}]);

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
