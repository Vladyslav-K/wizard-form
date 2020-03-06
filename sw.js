if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"82d1b98561b87d67ea4c00cae71c8491","url":"index.html"},{"revision":"3dd13c36e9604f996a8a68327b412498","url":"precache-manifest.3dd13c36e9604f996a8a68327b412498.js"},{"revision":"e3d8be523298b2c4487658e76c469314","url":"service-worker.js"},{"revision":"571048d67ecbabe789e0737b59098ce3","url":"static/css/2.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"6b2b8fde107c31ab3516f0742896bf28","url":"static/js/2.631932ed.chunk.js"},{"revision":"d75924c8bcb09a69f13d43f95a10bacc","url":"static/js/main.4dc231cc.chunk.js"},{"revision":"737c82dda7363aa6e8cd329a64d26070","url":"static/js/runtime-main.a8d095fe.js"}]);

    workbox.core.skipWaiting();

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
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
