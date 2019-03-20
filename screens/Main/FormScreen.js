/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, ScrollView, Button, ActivityIndicator, Text, Switch } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from 'theme';
import { Formik } from 'formik';
import { object as yupObject, string as yupString, boolean as yupBoolean } from 'yup';
import Form from 'components/forms/Form';
import { storePatientsInFire } from 'api/user';
import { connect } from 'react-redux';
import TopHeader from 'components/bars/TopHeader';

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={{ marginBottom: 3 }}>{label}</Text>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Text style={{ color: 'red' }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const validationSchema = yupObject().shape({
  email: yupString()
    .label('Email')
    .email()
    .required(),
  password: yupString()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  agreeToTerms: yupBoolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true
    ),
});

class FormScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleResponse=() => {
    // handleResponse
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('Home');
  }

  render() {
    // const user = this.props.user[0];
    // console.log(user);
    console.log("&&&&&&");
    console.log(this);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
      <View style={styles.container}>
        <TopHeader navigation={this.props.navigation} />
        <ScrollView>
          <View style={[styles.formikContainer, { paddingTop: 20, paddingBottom: 200 }]}>
            <Formik
            // initialValues={{ email: '' }}
              validationSchema={yupObject().shape({
                name: yupString()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Required'),
                // TODO VALIDATION...
                age: yupString()
                  .max(2, 'Too Long!'),
                // .required('Required'),
                email: yupString()
                  .email('Email is invalid'),
                // .required('Required'),
                phone: yupString()
                // .phone('Phone is invalid')
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .required('Required'),
              // problem: yupString()
              // .required('Required')
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                storePatientsInFire(values)
                  .then((res) => {
                    this.handleResponse(res);
                  })
                  .catch(() => {
                  // handle
                  });
              }}
              render={form => Form(form)}
            />
            {/* <Formik
              initialValues={{ email: '', password: '', agreeToTerms: false }}
              onSubmit={(values, actions) => {
                alert(JSON.stringify(values));
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
              validationSchema={validationSchema}
            >
              {formikProps => (
                <React.Fragment>
                  <TextInput
                    label='Email'
                    // value={this.state.text}
                    // value="some value"
                    onChangeText={text => this.setState({ text })}
                  />
                    <StyledInput
                    label="Email"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="johndoe@example.com"
                    autoFocus
                  />

                  <StyledInput
                    label="Password"
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="password"
                    secureTextEntry
                  />

                  <StyledSwitch
                    label="Agree to Terms"
                    formikKey="agreeToTerms"
                    formikProps={formikProps}
                  />

                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Button title="Submit" onPress={formikProps.handleSubmit} />
                  )}
                </React.Fragment>
              )}
            </Formik> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(FormScreen);
