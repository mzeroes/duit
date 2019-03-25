import firebase from 'utils/firebase';
import { AsyncStorage } from 'react-native';
import store from 'redux/store';
import moment from 'moment';
import { updateData } from 'redux/action';

export const resetTokenInStore = async () => {
  await AsyncStorage.setItem('userToken', '');
  await AsyncStorage.setItem('userTokenType', '');
};

const processData = (usr) => {
  let dt = '';
  if (!(typeof usr.dateTime === 'undefined' || !usr.dateTime)) {
    dt = new Date(usr.dateTime);
  }
  const obj = {
    patientImage: usr.patientImage,
    patientName: usr.patientName,
    patientDiagnosis: usr.patientDiagnosis,
    fees: usr.fees,
    age: usr.age,
    gender: usr.gender,
    mobile: usr.mobile,
    email: usr.email,
    address: usr.address,
    city: usr.city,
    weight: usr.weight,
    bodyTemperature: usr.bodyTemperature,
    bloodPressure: usr.bloodPressure,
    normalOrEmergency: usr.normalOrEmergency,
    date: !(dt === '') ? moment(dt).format('DD MMM YYYY') : '',
    time: !(dt === '') ? moment(dt).format('h:mm:ss a') : '',
    ago: !(dt === '') ? moment(dt).fromNow() : '',
    initials: usr.patientName.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g).join(''),
  };
  return obj;
};

export const getPatientsFromFire = async () => {
  const { user } = await store.getState();
  const patientsDataRef = firebase.database()
    .ref(`doctors/${user.uid}`)
    .orderByChild('dateTime');
  await patientsDataRef.on('value', (snapshot) => {
    const data = Object.values(snapshot.val()).reverse();
    store.dispatch(updateData(data.map(processData)));
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
  });
};

export const getDateAndTimeInIST = () => ({
  dateTime: Date.now()
});

export const storePatientsInFire = async (data) => {
  const dateTime = getDateAndTimeInIST();
  const user = await store.getState().user;
  await firebase.database().ref(`doctors/${user.uid}`).push({
    ...data,
    ...dateTime
  }).catch((error) => {
    console.warn('error ', error);
  });
};
