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
  time: (() => {
    const d = new Date();
    let h = d.getHours(); let m = d.getMinutes(); let
      l = 'AM';
    if (h > 12) {
      h -= 12;
    }
    if (h < 10) {
      h = `0${h}`;
    }
    if (m < 10) {
      m = `0${m}`;
    }
    if (d.getHours() >= 12) {
      l = 'PM';
    } else {
      l = 'AM';
    }
    return `${h}:${m} ${l}`;
  })()
});

export const storeAptsInFire = async (data) => {
  const time = getDateAndTimeInIST();
  console.warn({
    ...data,
    ...time
  });
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
