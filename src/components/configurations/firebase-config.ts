// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAksjNeXniXu23347-3PL0HM_JIReSy9i4",
    authDomain: "java29-shop-48166.firebaseapp.com",
    projectId: "java29-shop-48166",
    storageBucket: "java29-shop-48166.firebasestorage.app",
    messagingSenderId: "132101017783",
    appId: "1:132101017783:web:8742e55b7e7ddbe5d4fd32",
    measurementId: "G-9XMP96SFJ5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db = getFirestore(app);