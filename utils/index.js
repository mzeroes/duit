import { WebBrowser } from 'expo';
import { signOutUser } from 'components/auth/authFirebase';
import store from 'redux/store';
import { updateUser, updateloginStatus } from 'redux/action';
import { resetTokenInStore } from 'api/user';
import NavigationService from './NavigationService';

export const handleUrl = (url) => {
  WebBrowser.openBrowserAsync(url);
};

export const onPressLogoutAsync = async () => {
  try {
    await resetTokenInStore();
    await signOutUser();
    store.dispatch(updateUser({}));
    store.dispatch(updateloginStatus(false));
    NavigationService.navigate('Loading');
  } catch (err) {
    console.log(err);
  }
};
