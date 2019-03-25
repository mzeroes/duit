import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Theme } from 'theme';
import { connect } from 'react-redux';
import { Avatar, Card } from 'react-native-paper';
import { onPressLogoutAsync } from 'utils';

const LoggedUserCard = (props) => {
  const { user } = props;
  if (!user || user.providerData === undefined) return <View />;
  return (

    <ImageBackground
      source={{ uri: 'https://picsum.photos/400/100' }}
      style={{
        width: '100%',
        height: 200,
        marginTop: -28,
        paddingBottom: 20
      }}
    >
      <View style={{
        flexDirection: 'row',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center' }}
      >
        <Avatar.Image
          style={{
            justifyContent: 'center',
            alignSelf: 'center'
          }}
          source={
            user.providerData[0].photoURL
              ? {
                uri: user.photoURL
              }
              : require('assets/images/profile-1.png')
          }
        />
        <Card.Title
          style={{ flex: 1 }}
          title={(
            <Text
              style={[{ alignSelf: 'center' }]}
              numberOfLines={1}
            >
              {user.providerData[0].displayName && user.providerData[0].displayName}
            </Text>
            )}
          subtitle={(
            <Text
              style={[{ alignSelf: 'center' }]}
              numberOfLines={1}
            >
              {user.providerData[0].email && user.providerData[0].email}
            </Text>
            )}
        />
      </View>
      <Card.Content>
        {/* <Text
          numberOfLines={1}
          style={[Theme.text, {
            alignSelf: 'flex-start'
          }]}
        >
          {user.providerData[0].providerId && user.providerData[0].providerId}
        </Text> */}
        <TermsLogoutCard />
      </Card.Content>
    </ImageBackground>
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
    borderRadius: 4,
    alignItems: 'flex-end'
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

export default connect(mapStateToProps)(LoggedUserCard);
