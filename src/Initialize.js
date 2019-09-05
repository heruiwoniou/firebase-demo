import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCueD8cSViyVrPmA24aWCx-KkScFGaTXtc",
  authDomain: "fir-demo-8a0c2.firebaseapp.com",
  databaseURL: "https://fir-demo-8a0c2.firebaseio.com",
  projectId: "fir-demo-8a0c2",
  storageBucket: "",
  messagingSenderId: "836284731061",
  appId: "1:836284731061:web:6155ed0a4e9b3975"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
