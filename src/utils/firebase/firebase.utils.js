

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKuRQWLqQXw3hM3uzq66eKbB6zPnDjKA4",
  authDomain: "store-2844a.firebaseapp.com",
  projectId: "store-2844a",
  storageBucket: "store-2844a.appspot.com",
  messagingSenderId: "872241591531",
  appId: "1:872241591531:web:c113ada86558ef5a6afaae",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
const userDocRef = doc(db, 'users', userAuth.uid)

console.log(userDocRef);

const userSnapshot = await getDoc(userDocRef);
console.log(userSnapshot);
console.log(userSnapshot.exists());

if (!userSnapshot.exists()) {
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    })
  } catch (error) {
    console.log( 'error creating the user: ', error.message);
  }
}
return userDocRef;
}