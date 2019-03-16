import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Theme } from 'theme';
import { connect } from 'react-redux';

const LoggedUser = (props) => {
  const { user } = props;
  if (!user) return <View />;
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <Text
          style={[styles.monoText, { alignSelf: 'center' }]}
          numberOfLines={1}
        >
          {user.displayName && user.displayName}
        </Text>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50
          }}
          source={
            user.photoURL
              ? {
                uri: user.photoURL
              }
              : require('assets/images/profile-1.png')
          }
        />
      </View>
      <View style={styles.titleSubContainer}>
        <Text style={styles.monoText}>{user.email && user.email}</Text>
        <Text style={styles.monoText}>{user.uid}</Text>
        <Text style={styles.monoText}>{user.providerId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Theme.grey,
    padding: 12,
    marginTop: 12,
    marginBottom: 12
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
