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
      elevation={1}
      style={{
        backgroundColor: Theme.grey,
        marginTop: -22,
        // padding: 8
      }}
    >
      {/* <Card.Cover
        style={
          styles.titleContainer
        }
        source={{ uri: 'https://picsum.photos/200/200' }}
      /> */}
      <Card.Title
        title={(
          <Text
            style={[styles.monoText, { alignSelf: 'center' }]}
            numberOfLines={1}
          >
            {user.displayName && user.displayName}
          </Text>
            )}
        subtitle={
          <Text style={styles.monoText}>{user.email && user.email}</Text>
          }
        // eslint-disable-next-line no-shadow
        left={props => (
          <Avatar.Image
            {...props}
            source={
              user.photoURL
                ? {
                  uri: user.photoURL
                }
                : require('assets/images/profile-1.png')
              }
          />
        )}
      />
      <Card.Content>
        <Text style={styles.monoText}>{user.uid}</Text>
        <Text style={styles.monoText}>{user.providerId}</Text>
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
    <Text style={[styles.monoText, { color: Theme.red }]}>Logout</Text>
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
  user: state.user[0]
});

export default connect(mapStateToProps)(LoggedUser);
