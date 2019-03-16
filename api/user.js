import firebase from 'utils/firebase';
import { AsyncStorage } from 'react-native';

export const resetTokenInStore = async () => {
  await AsyncStorage.setItem('userToken', '');
  await AsyncStorage.setItem('userTokenType', '');
};


export const getAptsFromFire = async () => {
  // firebase.database().ref(`users/${user.uid}`).get('data');
  let results;
  await firebase.database().ref('users/').once('value', (snapshot) => {
    results = snapshot.val();
    if (results) { results = Object.values(results); }
    console.log(results);
  });

  const processUsers = usr => ({
    Name: usr.name,
    Age: usr.age,
    Email: usr.email,
    Phone: usr.phone,
    Problem: usr.problem
  });

  // for(let i = 0; i < length)

  // for (let i = 0; i < results.length; i++) {
  //   s = results[i];
  // }
  if (results) { return results.map(processUsers); }
  // console.warn(`USERS${users}`);
  // const users = Object.keys(results).map(processUsers);

  return [];
};

export const storeAptsInFire = async (data) => {
  await firebase.database().ref('users/').push({
    ...data
  }).then((res) => {
    // success callback
    console.log('data ', res);
  })
    .catch((error) => {
    // error callback
      console.log('error ', error);
    });
};
