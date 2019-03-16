import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Theme } from 'theme/index';
import LoggedUserCard from 'components/cards/LoggedUserCard';

import { onPressLogoutAsync } from 'utils';

const LogoutCard = () => (
  <View style={styles.container}>
    {/* <DataCard /> */}
    <LoggedUserCard />
    <TermsLogoutCard />
  </View>
);

export const TermsLogoutCard = () => (
  <View style={[styles.container, { justifyContent: 'flex-end', borderWidth: 0 }]}>
    <TouchableOpacity style={styles.logOutButton} onPress={onPressLogoutAsync}>
      <Text style={{ color: Theme.grey, fontWeight: 'bold' }}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Theme.grey,
    padding: 10,
    margin: 4,
    justifyContent: 'flex-start'
  },
  ppContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Theme.grey
  },
  tncContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Theme.grey,
    borderRadius: 4,

    // backgroundColor: Theme.grey,
  },
  logOutButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Theme.darkred,
    borderRadius: 4,
    backgroundColor: Theme.darkred,
    padding: 10
  }
});
export default LogoutCard;
