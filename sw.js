if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"299854b5e31b94e28677ad43ba32c748","url":"index.html"},{"revision":"7e1a97c86194702dfa9b8af88ee488fa","url":"precache-manifest.7e1a97c86194702dfa9b8af88ee488fa.js"},{"revision":"45ad078f89925a02ebe2d852cffcf1de","url":"service-worker.js"},{"revision":"ecadf2883c6d7faad899c08494b0799d","url":"static/css/3.2fcdc29a.chunk.css"},{"revision":"54367887dde9cc5769cfd0063fafc26c","url":"static/css/main.cf96ccdd.chunk.css"},{"revision":"e3b85aee820c2325ed8f0e3e9b023eaa","url":"static/js/0.15a1adb0.chunk.js"},{"revision":"a110febb43bbb71399d45695e43e920d","url":"static/js/1.a56f8f21.chunk.js"},{"revision":"250593295319cfba03cff6c23291d2f4","url":"static/js/10.e4a2f961.chunk.js"},{"revision":"93ac4e709a820a329e1670e34dbb5c3d","url":"static/js/11.a7a91260.chunk.js"},{"revision":"286cc2ccab39ee053ab31cbbcf320177","url":"static/js/12.fd2db7b2.chunk.js"},{"revision":"5bf73a4dd66652ef5aa017dcbb3a19b3","url":"static/js/13.509b0ce0.chunk.js"},{"revision":"f1f1391552f18e94767aed772826db7a","url":"static/js/2.6eb6cc11.chunk.js"},{"revision":"16fba373b0021eaae05d55644e716eeb","url":"static/js/3.781e17e7.chunk.js"},{"revision":"43e7e90a9983c50f754bf81d123c9a00","url":"static/js/6.e412f7dc.chunk.js"},{"revision":"f93e772ce9bb566e9fff9ef2cf4581d7","url":"static/js/7.ed9d924d.chunk.js"},{"revision":"c63de9a965bc8eae76d73aa682a43f4c","url":"static/js/8.eae49377.chunk.js"},{"revision":"fdb5f8a886a4a55ca69d947036f0fc3b","url":"static/js/9.dc9e8f93.chunk.js"},{"revision":"5e4bfc709fe4bab6892a3ba59418329e","url":"static/js/main.2cab1090.chunk.js"},{"revision":"9c74e7110c8dc84635a0d581fc1fbaf5","url":"static/js/runtime-main.d9f01acf.js"}]);

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
