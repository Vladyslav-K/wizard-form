if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"c37dd3dd0c59c0788cf8c9a98122839b","url":"icons/code_black_18x18.png"},{"revision":"e48e2057b7007fba0b36825eeafa393f","url":"icons/code_black_192x192.png"},{"revision":"2e5dc672198cf1ad8c3c7c084844af52","url":"index.html"},{"revision":"3ad3f155df2ca122917918dd2596c5cb","url":"precache-manifest.3ad3f155df2ca122917918dd2596c5cb.js"},{"revision":"9a70d8cc831b286e795e08ae548362a9","url":"service-worker.js"},{"revision":"571048d67ecbabe789e0737b59098ce3","url":"static/css/2.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"33a3438d867388f2b49a49a7422aab29","url":"static/js/2.8cbabdd9.chunk.js"},{"revision":"16eafc11a7e6b64c8cd38f4bbf03bebc","url":"static/js/main.328bf3db.chunk.js"},{"revision":"737c82dda7363aa6e8cd329a64d26070","url":"static/js/runtime-main.a8d095fe.js"}]);

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
