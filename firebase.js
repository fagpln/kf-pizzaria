import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwlMy0RdhlCkjWwq2InuojeKtJimGUR9I",
  authDomain: "kf-pizzaria.firebaseapp.com",
  projectId: "kf-pizzaria",
  storageBucket: "kf-pizzaria.firebasestorage.app",
  messagingSenderId: "679614383644",
  appId: "1:679614383644:web:c53a7230008c9e4ae1c1d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
