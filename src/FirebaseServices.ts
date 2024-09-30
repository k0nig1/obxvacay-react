import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
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
const auth = getAuth();

export async function createUser(email: string, password: string){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error when signing in: " + errorCode + errorMessage);
  })
}

export async function signInUser(email: string, password: string){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error when signing in: " + errorCode + errorMessage);
  });
}

export async function logOut(){
  signOut(auth).then(() => {
    console.log("Signed out");
  })
  .catch((error) => {
    console.error("Error when signing out");
  })

}