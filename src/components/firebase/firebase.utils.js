// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';
import 'firebase/auth';

// Web app's Firebase configuration
const config = {
    apiKey: "AIzaSyBy62JPjB4WpYoGqxhB_7QdIpaDUhWK6M4",
    authDomain: "crwn-db-18b67.firebaseapp.com",
    databaseURL: "https://crwn-db-18b67.firebaseio.com",
    projectId: "crwn-db-18b67",
    storageBucket: "crwn-db-18b67.appspot.com",
    messagingSenderId: "526556630840",
    appId: "1:526556630840:web:492f3513d432103127fbcd"
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // like Module or model name in normal db
    // User
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // get data
    // UserData 
    const snapshot = await userRef.get();

    //if no snapshot of user create one
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // create a data from Model
            // User.create();
            await userRef.set({
                email, displayName, createdAt, ...additionalData
            })
        } catch (error) {
            console.log(`Error creating user:${error.message}`);
        }
    }

    return userRef;

}
export default firebase;