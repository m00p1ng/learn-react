
console.log("In sw.js")

workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('http://.*:8000.*.json')
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])