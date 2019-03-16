/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from 'theme';
import { Formik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import { signupFire } from 'components/auth/authUsingEmail';
import SignUpForm from 'components/forms/SignUpForm';
import { TopBar } from 'components';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleResponse = (res) => {
    const { emailVerified } = res.user;
    if (!emailVerified) {
      const info = 'Email verification Link Send!';
      this.props.navigation.navigate('Providers', { info });
    } else {
      this.props.navigation.navigate('Loading');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TopBar
          onPress={() => {
            this.props.navigation.goBack();
          }}
          icon="ios-arrow-back"
        >
          <Text style={styles.monoText}>Sign up</Text>
        </TopBar>
        <View style={[styles.formikContainer, { paddingTop: 0 }]}>
          <Formik
            initialValues={{ email: 'john@doe.com', password: 'password' }}
            validationSchema={yupObject().shape({
              // name: yupString()
              //   .min(2, 'Too Short!')
              //   .max(50, 'Too Long!')
              //   .required('Required'),
              email: yupString()
                .email('Email is invalid')
                .required('Required'),
              password: yupString()
                .min(8, 'Minimum length should be greater than 8')
                .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              signupFire(values.email, values.password)
                .then((res) => {
                  this.handleResponse(res);
                })
                .catch((err) => {
                  if (err.code === 'auth/email-already-in-use') {
                    console.log(JSON.stringify(err));
                    const info = 'Email is already in use. Login to Continue.';
                    this.props.navigation.navigate('Providers', { info });
                  }
                });
            }}
            render={form => SignUpForm(form)}
          />
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
