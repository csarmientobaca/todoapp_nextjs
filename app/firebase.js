import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKm-RhkYSTB_8cxml245GgK-_CP58GKh0",
    authDomain: "todo-app-nextjs-8edab.firebaseapp.com",
    projectId: "todo-app-nextjs-8edab",
    storageBucket: "todo-app-nextjs-8edab.appspot.com",
    messagingSenderId: "686028536907",
    appId: "1:686028536907:web:9cffaf540459e2349421ce"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };