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

window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: "YOUR_ONESIGNAL_APP_ID",
    allowLocalhostAsSecureOrigin: true
  });
});

document.getElementById('notify-btn').addEventListener('click', () => {
  window.OneSignalDeferred.push(function(OneSignal) {
    OneSignal.Notifications.requestPermission();
  });
});

const sendBtn = document.getElementById('send-btn');
const msgInput = document.getElementById('message');
const userInput = document.getElementById('username');

function sendMessage() {
  const text = msgInput.value.trim();
  const name = userInput.value.trim() || 'Anonymous';

  if (text !== '') {
    db.ref('messages').push({
      user: name,
      text: text,
      timestamp: Date.now()
    });
    msgInput.value = '';
  }
}

sendBtn.addEventListener('click', sendMessage);

msgInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

const chatBox = document.getElementById('chat-box');
db.ref('messages').limitToLast(30).on('child_added', (snapshot) => {
  const data = snapshot.val();
  const msgEl = document.createElement('div');
  msgEl.className = 'msg';
  msgEl.innerHTML = `<strong>${data.user}</strong>${data.text}`;
  chatBox.appendChild(msgEl);
  chatBox.scrollTop = chatBox.scrollHeight;
});
