import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGmJS4VdekErRt-JBS_HYY1x8PXcm0uno",
  authDomain: "healthica-9f840.firebaseapp.com",
  databaseURL: "https://healthica-9f840-default-rtdb.firebaseio.com",
  projectId: "healthica-9f840",
  storageBucket: "healthica-9f840.appspot.com",
  messagingSenderId: "1057073583580",
  appId: "1:1057073583580:web:1a33e68ec2c06a28966b19",
  measurementId: "G-TQBPPL9VKJ",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
