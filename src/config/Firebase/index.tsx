// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9gHRIY6c5af7GkUDWHfTDsLEA80Q6yAc",
  authDomain: "shopping-list-dfa50.firebaseapp.com",
  projectId: "shopping-list-dfa50",
  storageBucket: "shopping-list-dfa50.appspot.com",
  messagingSenderId: "932734573241",
  appId: "1:932734573241:web:1771a1cda99436f800d968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, getFirestore, getDocs, doc, updateDoc };