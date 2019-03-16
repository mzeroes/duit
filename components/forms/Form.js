import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme, styles } from 'theme';

const Form = ({
  values,
  errors,
  touched,
  // eslint-disable-next-line no-unused-vars
  handleBlur,
  isSubmitting,
  setFieldTouched,
  // eslint-disable-next-line no-unused-vars
  handleChange,
  handleSubmit,
  setFieldValue
}) => (
  <KeyboardAvoidingView>
    <TextInput
      onChangeText={value => setFieldValue('name', value)}
      value={values.name}
      label="Name"
      underlineColor="transparent"
      onBlur={() => setFieldTouched('name')}
      placeholder="john doe"
      editable={!isSubmitting}
      error={touched.name && errors.name ? errors.name : undefined}
    />
    <Text style={styles.errorText}>
      {touched.name && errors.name ? errors.name : undefined}
    </Text>
    <TextInput
      onChangeText={value => setFieldValue('age', value)}
          // mode="outlined"
      keyboardType="number-pad"
      underlineColor="transparent"
      value={values.age}
      label="Age"
      onBlur={() => setFieldTouched('email')}
      placeholder="18"
      editable={!isSubmitting}
      error={touched.age && errors.age ? errors.age : undefined}
    />
    <Text style={styles.errorText}>
      {touched.age && errors.age ? errors.age : undefined}
    </Text>
    <TextInput
      onChangeText={value => setFieldValue('email', value)}
          // mode="outlined"
      keyboardType="email-address"
      underlineColor="transparent"
      value={values.email}
      label="Email"
      onBlur={() => setFieldTouched('email')}
      placeholder="john@doe.com"
      editable={!isSubmitting}
      error={touched.email && errors.email ? errors.email : undefined}
    />
    <Text style={styles.errorText}>
      {touched.email && errors.email ? errors.email : undefined}
    </Text>

    <TextInput
      theme={{ roundness: 3 }}
      onChangeText={value => setFieldValue('phone', value)}
          // mode="outlined"
      value={values.phone}
      keyboardType="phone-pad"
      underlineColor="transparent"
      label="Phone"
      placeholder=""
      disabled={errors.phone}
      onBlur={() => setFieldTouched('phone')}
      editable={!isSubmitting}
      error={
            touched.phone && errors.phone ? errors.phone : undefined
          }
    />
    <Text style={styles.errorText}>
      {touched.phone && errors.phone ? errors.phone : undefined}
    </Text>
    <TextInput
      theme={{ roundness: 3 }}
      onChangeText={value => setFieldValue('problem', value)}
          // mode="outlined"
      numberOfLines={10}
      multiline
      value={values.problem}
      underlineColor="transparent"
      label="Problem"
      placeholder=""
      disabled={errors.problem}
      onBlur={() => setFieldTouched('problem')}
      editable={!isSubmitting}
      error={
            touched.problem && errors.problem ? errors.problem : undefined
          }
    />
    <Text style={styles.errorText}>
      {touched.problem && errors.problem ? errors.problem : undefined}
    </Text>
    <TouchableOpacity
      onPress={() => {
        handleSubmit();
      }}
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
  </KeyboardAvoidingView>
);

export default Form;
