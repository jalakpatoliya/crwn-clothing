import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBy62JPjB4WpYoGqxhB_7QdIpaDUhWK6M4",
  authDomain: "crwn-db-18b67.firebaseapp.com",
  databaseURL: "https://crwn-db-18b67.firebaseio.com",
  projectId: "crwn-db-18b67",
  storageBucket: "crwn-db-18b67.appspot.com",
  messagingSenderId: "526556630840",
  appId: "1:526556630840:web:492f3513d432103127fbcd"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
