import firebase from 'utils/firebase';
import { AsyncStorage } from 'react-native';
import store from 'redux/store';

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
    Problem: usr.problem,
    Time: usr.time,
    Date: usr.date
  });

  // for(let i = 0; i < length)

  // for (let i = 0; i < results.length; i++) {
  //   s = results[i];
  // }
  if (results) { return results.map(processUsers).reverse(); }
  // console.warn(`USERS${users}`);
  // const users = Object.keys(results).map(processUsers);

  return [];
};

export const getDateAndTimeInIST = () => ({
  date: new Date().toJSON().slice(0, 10),
  time: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
});

export const storeAptsInFire = async (data) => {
  const time = getDateAndTimeInIST();
  // console.warn({
  //   ...data,
  //   ...time
  // });
  // const user = await store.getState().user;
  // console.warn(user);
  // firebase.database().ref(`users/${user.uid}`).set({
  //   ...data,
  //   ...time
  // })
  //   .then((res) => {
  //     console.log('data', res);
  //   })
  //   .catch((error) => {
  //     console.warn('error ', error);
  //   });
  await firebase.database().ref('users/').push({
    ...data,
    ...time
  }).then((res) => {
    // success callback
    console.log('data ', res);
  })
    .catch((error) => {
    // error callback
      console.log('error ', error);
    });
};
