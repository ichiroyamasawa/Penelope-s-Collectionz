import firebase from "firebase/app"; //firebase utilities
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase-admin";
import { firebaseConfig } from "./config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize the default app
export const admin = require("firebase-admin");
var serviceAccount = require("./../serviceAccountKey.json");

var app = admin.initializeApp();

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const auth = firebase.auth();
export const authProvider = firebase.auth.EmailAuthProvider;
export const firestore = firebase.firestore();
export const fieldVal = firebase.firestore.FieldValue;

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  const { displayName, email, emailVerified } = userAuth;

  if (!snapshot.exists) {
    const timestamp = new Date();
    const userRoles = ["customer"];
    try {
      await userRef.set({
        email,
        emailVerified,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (e) {
      console.log(e);
    }
  }
  try {
    await userRef.update({ emailVerified });
  } catch (e) {
    console.log(e);
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
