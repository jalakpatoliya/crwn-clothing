import { call, all, put, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { getCurrentUser, createUserProfileDocument, signInWithGoogle as signInWithGoogleUtil, auth } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();

        yield put(
            signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
        )
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield signInWithGoogleUtil();
        yield getSnapShotFromUserAuth(user)

    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* signInWithEmail({ payload: { email, password } }) {
    try {

        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }

}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    try {
        yield getSnapShotFromUserAuth(user, additionalData);
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}
