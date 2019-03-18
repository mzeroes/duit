import firebase from 'utils/firebase';
import { authStateAsync } from 'components/auth/authFirebase';

export const verifyEmail = async () => {
  const user = firebase.auth().currentUser;
  console.info(`User for verifyEmail : ${JSON.stringify(user, null, 4)}`);
  if (user.emailVerified === false) {
    user
      .sendEmailVerification()
      .then(() => {
        console.log('Verification email sent');
      })
      .catch((error) => {
        console.warn(`Errors in Email Verification : ${error}`);
      });
  } else {
    console.log('Email already verfied!');
  }
};

export const signupFire = async (email, password) => {
  console.info('In signupFire');
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.info(res);
    return res;
  } catch (err) {
    throw err;
  }
};

export const loginFireWithEmail = async (email, password) => {
  const response = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (!response.user.emailVerified) return 'emailUnverified';
  await authStateAsync();
  return 'success';
};
