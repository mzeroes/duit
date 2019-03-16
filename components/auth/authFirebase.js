import firebase from 'utils/firebase';
import { userUpdateAsync } from 'api/update';

export const signOutUser = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch((error) => {
      console.warn(error);
    });
};

export const authStateAsync = async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.info('In userAuthStateChanged()');
      userUpdateAsync(user);
    }
  });
};
