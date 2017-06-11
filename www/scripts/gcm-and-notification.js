function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    console.log('chrome runtime lastError');
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(registrationId, function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
      chrome.storage.local.set({registered: true});
  });
}

function sendRegistrationId(id, callback) {
  console.log("sending", id);
}

chrome.storage.local.get("registered", function(result) {
  console.log('result', result);
  // If already registered, bail out.
  if (result["registered"])
    return;

  // Up to 100 senders are allowed.
  var senderIds = ['884158607863'];
  chrome.gcm.register(senderIds, registerCallback);
});

chrome.gcm.onMessage.addListener(function(message) {
  console.log('message', message);
  new Notification(message.data["gcm.notification.title"], {
    body: message.data["gcm.notification.body"],
    icon: message.data["gcm.notification.icon"]
  });
});
