import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from 'theme';
// import { loginFireUsingFaceBook } from 'components/auth/authUsingFacebook';
import { loginFireUsingGoogle } from 'components/auth/authUsingGoogle';
import {
  GoogleSignInButton,
  // FacebookSignInButton,
  // LoginSignInButton
} from 'components/auth/LoginButtons';
import { Icon } from 'expo';
import Login from './LogIn';

class SignInProvidersScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.formikContainer}>
        <Login navigation={navigation} />
        <Text style={styles.monoText}>or</Text>
        <View style={{ flex: 1 }}>
          {/* <LoginSignInButton navigation={navigation} /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PhoneAuth');
            }}
            activeOpacity={0.6}
            style={[styles.touchableButton, {
              paddingLeft: 0,
              borderRadius: 4,
              padding: 10,
              marginTop: 10,
              marginBottom: 10 }]}
          >
            <Icon.Ionicons
              name="ios-call"
              style={{
                marginHorizontal: 12,
                fontSize: 25,
                width: 24,
                aspectRatio: 1,
                alignItems: 'flex-start',
                color: 'white' }}
            />
            <Text style={{ color: '#fff' }}>Continue with Phone</Text>
          </TouchableOpacity>
          <GoogleSignInButton
            login={loginFireUsingGoogle}
            navigation={navigation}
          />
          {/* <FacebookSignInButton
            login={loginFireUsingFaceBook}
            navigation={navigation}
          /> */}
        </View>
      </View>
    );
  }
}

export default SignInProvidersScreen;
