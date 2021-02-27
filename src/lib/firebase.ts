import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCYE1PzlD4tdTd7R9LG4-82YOytnrkhHRE",
  authDomain: "nextfire-98419.firebaseapp.com",
  projectId: "nextfire-98419",
  storageBucket: "nextfire-98419.appspot.com",
  messagingSenderId: "603070550326",
  appId: "1:603070550326:web:e71a86e3d3ff5768482397",
  measurementId: "G-6K6YCFFM6X",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
