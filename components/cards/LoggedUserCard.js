import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from 'theme';
import { connect } from 'react-redux';
import { Avatar, Card } from 'react-native-paper';
import { onPressLogoutAsync } from 'utils';

const LoggedUser = (props) => {
  const { user } = props;
  if (!user) return <View />;
  return (
    <Card
      // elevation={1}
      style={{
        backgroundColor: Theme.grey,
        marginTop: -24,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      elevation={0}
    >
      <Card.Cover
        style={[
          styles.titleContainer, {
            height: 100,
            maxHeight: 100
          }
        ]}
        source={{ uri: 'https://picsum.photos/400/100' }}
      />
      <Card.Title
        title={(
          <Text
            style={[{ alignSelf: 'center' }]}
            numberOfLines={1}
          >
            {user.providerData[0].displayName && user.providerData[0].displayName}
          </Text>
            )}
        subtitle={
          <Text>{user.providerData[0].email && user.providerData[0].email}</Text>
          }
        // eslint-disable-next-line no-shadow
        left={props => (
          <Avatar.Image
            {...props}
            source={
              user.providerData[0].photoURL
                ? {
                  uri: user.photoURL
                }
                : require('assets/images/profile-1.png')
              }
          />
        )}
      />
      <Card.Content>
        <Text style={Theme.text}>{user.uid}</Text>
        <Text style={Theme.text}>
          {user.providerData[0].providerId && user.providerData[0].providerId}
        </Text>
        <Card.Actions>
          <TermsLogoutCard />
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

export const TermsLogoutCard = () => (
  // <View style={[styles.container, { justifyContent: 'flex-end', borderWidth: 0, padding: 10 }]}>
  <TouchableOpacity style={styles.logOutButton} onPress={onPressLogoutAsync}>
    <Text style={[{ color: Theme.red }]}>Logout</Text>
  </TouchableOpacity>
  // {/* </View> */}
);

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: Theme.statusbar,
  },
  logOutButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: Theme.red,
    // borderRadius: 4,
    // width: '70%',
    // marginLeft: 30,
    // marginRight: 30,
    // backgroundColor: Theme.red,
    padding: 6
  },
  titleSubContainer: {
    alignContent: 'center'
  },
  titleIconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 2
  },
  titleHeader: {
    alignSelf: 'center',
    fontSize: 28,
    color: Theme.primary
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: Theme.secondary
  },
  userText: {
    fontSize: 14,
    marginTop: 6,
    color: Theme.dark
  },
  monoText: {
    fontSize: 14,
    color: Theme.infoText,
    fontFamily: 'space-mono'
  }
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(LoggedUser);
/**
 *  structure of user object...
 * "user": Object {
    "apiKey": "AIzaSyD6K_6caJbo8RV19mIN1hVm2xh7PAJ_z-c",
    "appName": "[DEFAULT]",
    "authDomain": "duit-agra-opd-mobile-app.firebaseapp.com",
    "createdAt": "1553007160663",
    "displayName": null,
    "email": "john@doe.in",
    "emailVerified": false,
    "isAnonymous": false,
    "lastLoginAt": "1553007160663",
    "phoneNumber": null,
    "photoURL": null,
    "providerData": Array [
      Object {
        "displayName": null,
        "email": "john@doe.in",
        "phoneNumber": null,
        "photoURL": null,
        "providerId": "password",
        "uid": "john@doe.in",
      },
    ],

 *
 */
