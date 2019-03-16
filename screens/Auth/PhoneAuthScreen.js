import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { Linking, WebBrowser } from 'expo';
import firebase from 'utils/firebase';
import { TextInput } from 'react-native-paper';
import { styles } from 'theme';

const captchaUrl = `https://morphine-c575e.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`;

const Button = props => (
  <TouchableOpacity {...props}>
    <Text>{props.title}</Text>
  </TouchableOpacity>
);

export default class App extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      phone: '',
      confirmationResult: undefined,
      code: '',
    };
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onPhoneComplete = async () => {
    let token = null;
    const listener = ({ url }) => {
      WebBrowser.dismissBrowser();
      const tokenEncoded = Linking.parse(url).queryParams.token;
      if (tokenEncoded) { token = decodeURIComponent(tokenEncoded); }
    };
    Linking.addEventListener('url', listener);
    await WebBrowser.openBrowserAsync(captchaUrl);
    Linking.removeEventListener('url', listener);
    if (token) {
      const { phone } = this.state;
      // fake firebase.auth.ApplicationVerifier
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token)
      };
      try {
        const confirmationResult = await firebase
          .auth().signInWithPhoneNumber(phone, captchaVerifier);
        this.setState({ confirmationResult });
      } catch (e) {
        console.warn(e);
      }
    }
  }

  onCodeChange = (code) => {
    this.setState({ code });
  }

  onSignIn = async () => {
    const { confirmationResult, code } = this.state;
    try {
      await confirmationResult.confirm(code);
    } catch (e) {
      console.warn(e);
    }
    this.reset();
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  }

  reset = () => {
    this.setState({
      phone: '',
      // eslint-disable-next-line react/no-unused-state
      phoneCompleted: false,
      confirmationResult: undefined,
      code: ''
    });
  }

  render() {
    if (this.state.user) {
      this.props.navigation.navigate('Loading');
    }

    if (!this.state.confirmationResult) {
      return (
        <ScrollView style={{ padding: 20, marginTop: 40 }}>
          <Text>Test Phone No.: +919876543210</Text>
          <TextInput
            value={this.state.phone}
            onChangeText={this.onPhoneChange}
            keyboardType="phone-pad"
            placeholder="Your phone"
            underlineColor="transparent"
            // mode="outlined"
            label="Your phone number"
          />
          <Button
            style={[
              styles.touchableButton,
              {
                width: '100%',
                alignItems: 'center',
                borderRadius: 4,
                padding: 14,
                marginTop: 10,
                marginBottom: 10
              }
            ]}
            // style={{ marginTop: 40 }}
            onPress={this.onPhoneComplete}
            title="Next"
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ padding: 20, marginTop: 40 }}>
          <Text>Test Code: 123456</Text>
          <TextInput
            underlineColor="transparent"
            value={this.state.code}
            onChangeText={this.onCodeChange}
            keyboardType="numeric"
            placeholder="Code from SMS"
          />
          <Button
            style={[
              styles.touchableButton,
              {
                width: '100%',
                alignItems: 'center',
                borderRadius: 4,
                padding: 14,
                marginTop: 10,
                marginBottom: 10
              }
            ]}
            onPress={this.onSignIn}
            title="Sign in"
          />
        </ScrollView>
      );
    }
  }
}
