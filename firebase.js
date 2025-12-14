import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXbf6pqP8PUPaEjNbRptM_IDgzmBWS1Kw",
  authDomain: "imraan-si.firebaseapp.com",
  projectId: "imraan-si",
  storageBucket: "imraan-si.firebasestorage.app",
  messagingSenderId: "264220348278",
  appId: "1:264220348278:web:fb43027a11d9f04ea67457"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveContactMessage({ name, email, message }) {
  return await addDoc(collection(db, "contactMessages"), {
    name,
    email,
    message,
    createdAt: serverTimestamp()
  });
}
