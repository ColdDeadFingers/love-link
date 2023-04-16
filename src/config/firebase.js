import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAnCWLPVbTx7PWAae98Qm_mh3foALHQbo8",
  authDomain: "love-link-5d608.firebaseapp.com",
  projectId: "love-link-5d608",
  storageBucket: "love-link-5d608.appspot.com",
  messagingSenderId: "73752573690",
  appId: "1:73752573690:web:003f2f71f87ec2a3fc7b43",
  measurementId: "G-KG1YKQNFTM"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

export const db = getFirestore(app);
export const storage =  getStorage(app);
