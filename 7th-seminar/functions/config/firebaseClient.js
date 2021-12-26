const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyBPPO2tYn8YBqV1tI3P0xPGEdrv_kuRt4s',
  authDomain: 'wesopt29-2e38a.firebaseapp.com',
  projectId: 'wesopt29-2e38a',
  storageBucket: 'wesopt29-2e38a.appspot.com',
  messagingSenderId: '206581593815',
  appId: '1:206581593815:web:85d91379301e5998efa292',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };
