const admin = require('firebase-admin');
const serviceAccount = require('./wesopt29-2e38a-firebase-adminsdk-yi95u-129eae398c');
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
