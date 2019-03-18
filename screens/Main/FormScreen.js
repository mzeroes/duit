/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from 'theme';
import { Formik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import Form from 'components/forms/Form';
import { storeAptsInFire } from 'api/user';
import { connect } from 'react-redux';
import TopHeader from 'components/bars/TopHeader';

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
                storeAptsInFire(values)
                  .then((res) => {
                    this.handleResponse(res);
                  })
                  .catch(() => {
                  // handle
                  });
              }}
              render={form => Form(form)}
            />
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
