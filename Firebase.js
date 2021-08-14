var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://husaegi2021-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
export const getDB = root => admin.database().ref(root);

