// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,browserLocalPersistence,setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr4oMEdJpszRTaUQzXDXV0T-7CzIJ2UiM",
  authDomain: "netflix-gpt-3e7f9.firebaseapp.com",
  projectId: "netflix-gpt-3e7f9",
  storageBucket: "netflix-gpt-3e7f9.appspot.com",
  messagingSenderId: "501618326778",
  appId: "1:501618326778:web:8a01ca2bc4c67fd2e0dd43",
  measurementId: "G-TCS91F1PCN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Enable persistent login in browser
setPersistence(auth, browserLocalPersistence);

export default app;

