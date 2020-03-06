if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"f26c51baec601466761f1d73131e0219","url":"index.html"},{"revision":"3c2afa9dd813e0d9dfd991f166df5329","url":"precache-manifest.3c2afa9dd813e0d9dfd991f166df5329.js"},{"revision":"9efbeff99c4f6d764827324581da54b8","url":"service-worker.js"},{"revision":"dd90c92cacce1af72e1196c100b9392c","url":"static/css/1.b90ce945.chunk.css"},{"revision":"d10681d469d63c8bc9fc343b93c18eb2","url":"static/css/7.c719baa7.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"0b4980eff6e1c163051a26f9c092473d","url":"static/js/0.042d314b.chunk.js"},{"revision":"6e3694a573569f7c1bfe74fe4b2c009a","url":"static/js/1.66e11d18.chunk.js"},{"revision":"a200a1041724876f223c1b2f39ed3ae2","url":"static/js/2.3738552e.chunk.js"},{"revision":"921b51a7bb0dd3762b122c49da371298","url":"static/js/3.4ae43b8b.chunk.js"},{"revision":"9dfe0799a6524adeb2f1d02a9549c3fa","url":"static/js/4.12bde562.chunk.js"},{"revision":"1809bf709660feb712981a02164b5578","url":"static/js/7.910a2fb9.chunk.js"},{"revision":"8ce596fe7f70b81c91aafcc0ddfc05c1","url":"static/js/main.c767db29.chunk.js"},{"revision":"167e61fb40d6d590de406e5350c6bfba","url":"static/js/runtime-main.f9c1a7b9.js"}]);

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
