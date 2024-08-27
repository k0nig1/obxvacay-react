import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYKSDbADd5dKnY6bltoVjQk-mX2ouguBo",
  authDomain: "obxvacay-ionicreact.firebaseapp.com",
  projectId: "obxvacay-ionicreact",
  storageBucket: "obxvacay-ionicreact.appspot.com",
  messagingSenderId: "284338104076",
  appId: "1:284338104076:web:badf7a2a87273f89754b29",
  measurementId: "G-M41Q311Y15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function loginUser(email: string, password: string){

  firebase.auth().signInWithEmailAndPassword(email, password);
}