import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

import {
  getAuth, // to get auth service of any kinf we need this
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//configuring firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_ApiKey,
  authDomain: process.env.REACT_APP_AuthDomain,
  projectId: process.env.REACT_APP_ProjectID,
  storageBucket: process.env.REACT_APP_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSendersID,
  appId: process.env.REACT_APP_AppID,
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// adding the categories to the database
export const addcollectionAndDoc = async (collectionKey, thingsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // to maintain proper transactions

  thingsToAdd.forEach((element) => {
    const docRef = doc(collectionRef, element.title.toLowerCase()); // get the doc ref as the the one in collection ref having same title as. if not present firebase will automaticlly create it.
    batch.set(docRef, element); // setter on docRef that adds the element to the db
  });
  await batch.commit(); //commit changes to db
  console.log("done");
};

export const getCategoriesAndDocs = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnap) => {
    const { title, items } = docSnap.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeObserver = (callback) =>
  onAuthStateChanged(auth, callback);
