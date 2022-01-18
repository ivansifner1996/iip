import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAG8ktfTb2inWbdi18P5HNZL0lLE63uJPI",
  authDomain: "nikeaplikacija.firebaseapp.com",
  databaseURL: "https://nikeaplikacija-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nikeaplikacija",
  storageBucket: "nikeaplikacija.appspot.com",
  messagingSenderId: "856818997485",
  appId: "1:856818997485:web:e33179078ef07c8e6754e4"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

export {db, auth, storage};