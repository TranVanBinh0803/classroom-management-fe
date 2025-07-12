import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "classrom-management-app.firebaseapp.com",
  projectId: "classrom-management-app",
  storageBucket: "classrom-management-app.firebasestorage.app",
  messagingSenderId: "1068594831764",
  appId: "1:1068594831764:web:ec56a73358bd83178b6f81",
  measurementId: "G-YMVYP6N9L9",
  databaseURL: "https://classrom-management-app-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
