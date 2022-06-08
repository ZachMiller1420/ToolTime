// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGUabX7unBbzhGIR5pOlTQmzTteePR04A",
  authDomain: "tooltime-89342.firebaseapp.com",
  projectId: "tooltime-89342",
  storageBucket: "tooltime-89342.appspot.com",
  messagingSenderId: "395883300305",
  appId: "1:395883300305:web:0f5ec0679d36d0ebd88cf0",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();

firebase.firestore();

export { auth };
export default firebase;
