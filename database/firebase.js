import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDnCUffvZ1RE-JYPnk3wWOG8aUGzPqTbA",
    authDomain: "checkiningthis.firebaseapp.com",
    projectId: "checkiningthis",
    storageBucket: "checkiningthis.appspot.com",
    messagingSenderId: "72314889270",
    appId: "1:72314889270:web:be9323773325f74d5ae497"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);

  export {
      db,
      auth
  };