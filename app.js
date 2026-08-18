const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Initialize OneSignal
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: "Edaff065-033d-40f1-bbd2-33cea5e7370b",
    allowLocalhostAsSecureOrigin: true
  });
});

// Button listener to request notification permission
document.getElementById('notify-btn').addEventListener('click', function() {
  window.OneSignalDeferred.push(function(OneSignal) {
    OneSignal.Notifications.requestPermission();
  });
});
