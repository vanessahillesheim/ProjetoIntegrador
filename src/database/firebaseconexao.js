// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCONwPi2-6JxkCd5LTylO1lSVq3ULImK2k",
    authDomain: "runtraking.firebaseapp.com",
    databaseURL: "https://runtraking-default-rtdb.firebaseio.com",
    projectId: "runtraking",
    storageBucket: "runtraking.appspot.com",
    messagingSenderId: "1058600485662",
    appId: "1:1058600485662:web:55bfe18a831fa8b51cbf0f",
    measurementId: "G-V2WFVG5988"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const database = getFirestore(app);

export default database;
