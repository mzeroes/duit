/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, Switch, TouchableOpacity, StyleSheet, Icon, KeyboardAvoidingView } from 'react-native';
import { TextInput, RadioButton, TouchableRipple, Button } from 'react-native-paper';
import { styles, Theme } from 'theme';
import { Formik, RadioInput } from 'formik';
import { object as yupObject, string as yupString, boolean as yupBoolean, number as yupNumber } from 'yup';
import Form from 'components/forms/Form';
import { storePatientsInFire } from 'api/user';
import { connect } from 'react-redux';
import TopHeader from 'components/bars/TopHeader';
import UploadAvatar from '../../components/UploadAvatar';
import { Ionicons } from '@expo/vector-icons';

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
      onValueChange={(value) => {
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

  handleResponse = () => {
    // handleResponse
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('Home');
  }

  render() {
    // const user = this.props.user[0];
    // console.log(user);
    // console.log('&&&&&&');
    // console.log(this);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
      <KeyboardAvoidingView>
      <View style={styles.container}>
        <TopHeader navigation={this.props.navigation} />
        <ScrollView>
          <View style={[styles.formikContainer, { paddingTop: 20, paddingBottom: 200 }]}>
            <UploadAvatar
              getImage={(image) => {
                console.log(`Uploaded Image URI :: ${image}`);
                setFieldValue('patientImage', image)
              }}
            />
            <Formik
              // initialValues={{ email: '' }}
              validationSchema={yupObject().shape({
                patientName: yupString()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Required'),
                patientDiagnosis: yupString()
                  .required('Required'),
                fees: yupNumber()
                  .required('Required')
                  .positive()
                  .integer(),
                age: yupNumber()
                  .positive()
                  .max(120),
                email: yupString()
                  .email('Email is invalid'),
                mobile: yupString()
                  .matches(phoneRegExp, 'Mobile number is not valid')
                  .required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log("onSubmit called *****")
                setSubmitting(true);
                storePatientsInFire(values)
                  .then((response) => {
                    this.handleResponse(response);
                  })
                  .catch(() => {
                    // handle
                  });
              }}
            // render={form => Form(form)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                setTouched
                /* and other goodies */
              }) => (
                <ScrollView>
                  <View style={localStyles.TextInputContainer}>
                    <Ionicons name="md-person" size={32} color="green" style={localStyles.leftIcons} />
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('patientName', value)}
                      value={values.patientName}
                      label="Patient Name"
                      onBlur={() => setFieldTouched('patientName')}
                      placeholder="Patient Name"
                      error={
                        touched.patientName && errors.patientName ? errors.patientName : undefined
                      }
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <Ionicons name="ios-add" size={32} color="green" style={localStyles.leftIcons} />
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('patientDiagnosis', value)}
                      value={values.patientDiagnosis}
                      label="Patient Diagnosis"
                        onBlur={() => setFieldTouched('patientDiagnosis')}
                      placeholder="Patient Diagnosis"
                      numberOfLines={6}
                      multiline = {true}
                      error={touched.patientDiagnosis
                              && errors.patientDiagnosis ? errors.patientDiagnosis : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <Ionicons name="md-person" size={32} color="green" style={localStyles.leftIcons} />
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('fees', value)}
                      value={values.fees}
                      label="Fees"
                        onBlur={() => setFieldTouched('fees')}
                      placeholder="Fees"
                      keyboardType="number-pad"
                      error={touched.fees && errors.fees ? errors.fees : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('age', value)}
                      value={values.age}
                      label="Age"
                        onBlur={() => setFieldTouched('age')}
                      placeholder="Age"
                      keyboardType="number-pad"
                      error={touched.age && errors.age ? errors.age : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    {/* <RadioButton
                      value="first"
                      // status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: 'first' }); }}
                    />
                    <RadioInput
                      value="second"
                      // status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: 'second' }); }}
                    /> */}
                     {/* <RadioInput
                        id="blue"
                        value={values.color}
                        name="color"
                        checked={values.color === 'blue'}
                        label="Blue"
                        onBlur={handleBlur}
                        onChange={() => {
                          setFieldValue('color', 'blue')
                        }}
                      />

                      <RadioInput
                        id="red"
                        value={values.color}
                        name="color"
                        checked={values.color === 'red'}
                        label="Red"
                        onBlur={handleBlur}
                        onChange={() => {
                          setFieldValue('color', 'red')
                        }}
                      /> */}
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('gender', value)}
                      value={values.gender}
                      label="Gender"
                        onBlur={() => setFieldTouched('gender')}
                      placeholder="Gender"
                      error={touched.gender && errors.gender ? errors.gender : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('mobile', value)}
                      value={values.mobile}
                      label="Mobile"
                        onBlur={() => setFieldTouched('mobile')}
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      error={touched.mobile && errors.mobile ? errors.mobile : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('email', value)}
                      value={values.email}
                      label="Email"
                        onBlur={() => setFieldTouched('email')}
                      placeholder="Email"
                      autoCapitalize="none"
                      error={touched.email && errors.email ? errors.email : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('address', value)}
                      value={values.name}
                      label="Address"
                        onBlur={() => setFieldTouched('address')}
                      placeholder="Address"
                      numberOfLines={6}
                      multiline = {true}
                      error={touched.name && errors.name ? errors.name : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('city', value)}
                      value={values.city}
                      label="City"
                        onBlur={() => setFieldTouched('city')}
                      placeholder="City"
                      error={touched.city && errors.city ? errors.city : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('weight', value)}
                      value={values.weight}
                      label="Weight"
                        onBlur={() => setFieldTouched('weight')}
                      placeholder="Weight"
                      error={touched.weight && errors.weight ? errors.weight : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('bodyTemperature', value)}
                      value={values.bodyTemperature}
                      label="Body Temperature"
                        onBlur={() => setFieldTouched('bodyTemperature')}
                      placeholder="Body Temperature"
                      error={touched.bodyTemperature
                        && errors.bodyTemperature ? errors.bodyTemperature : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('bloodPressure', value)}
                      value={values.bloodPressure}
                      label="Blood Pressure"
                        onBlur={() => setFieldTouched('bloodPressure')}
                      placeholder="Blood Pressure"
                      error={touched.bloodPressure
                              && errors.bloodPressure ? errors.bloodPressure : undefined}
                    />
                  </View>
                  <View style={localStyles.TextInputContainer}>
                    <TextInput
                      style={localStyles.rightTextInputs}
                      onChangeText={value => setFieldValue('normalOrEmergency', value)}
                      value={values.bloodPressure}
                      label="Normal Or Emergency?"
                        onBlur={() => setFieldTouched('normalOrEmergency')}
                      placeholder="Normal Or Emergency?"
                      error={touched.normalOrEmergency
                              && errors.normalOrEmergency ? errors.normalOrEmergency : undefined}
                    />
                  </View>
                  <Text style={[styles.errorText, {alignSelf:"flex-start"}]}>
                    {/* {JSON.stringify(touched)}
                    {JSON.stringify(errors)} */}
                    {/* {touched.problem && errors.problem ? errors.problem : undefined} */}
                    {
                      Object.keys(errors).map((key, index) => ( 
                      `${key} : ${errors[key]}\n`
                      ))
                    }
                  </Text>

                  <TouchableOpacity
                    onPress={async () => {
                      await setTouched(["patientName ", "patientDiagnosis"]);
                      handleSubmit();
                    }}
                    activeOpacity={0.6}

                    style={[
                      styles.touchableButton,
                      {
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: Theme.red,
                        borderRadius: 4,
                        padding: 14,
                        marginTop: 10,
                        marginBottom: 10
                      }
                    ]}
                  >
                    <Text style={{ color: Theme.white, fontWeight: 'bold' }}>Continue</Text>
                  </TouchableOpacity>

                  {/* {isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Button title="Submit" onPress={handleSubmit} style={{}} />
                  )} */}
                </ScrollView>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const localStyles = StyleSheet.create({
  TextInputContainer: {
    paddingBottom: 10,
    flexDirection: 'row'
  },
  searchIcon: {
    padding: 10,
  },
  leftIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  rightTextInputs: {
    flex: 7
  }
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(FormScreen);
