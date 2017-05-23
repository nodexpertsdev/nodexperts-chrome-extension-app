
/**
* @desc Service worker file - All events and code of service worker will go here
* Basically this file will run as proxy to intercept requests.
* @author Mukul
*/

var name = 'NodeXperts Feed v1.0.0';

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: 'Alea iacta est',
    })
  );
});
