import React from 'react';
import { View, Platform } from 'react-native';

import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';

import { Theme } from 'theme';
import Layout from 'theme/constants/Layout';

import LogoutCard from 'components/cards/LogoutCard';

import FormScreen from '../screens/Main/FormScreen';
import ExploreStack from './ExploreStack';

// const ExploreNav = ExploreStack;
// ExploreNav.navigationOptions = {
//   drawerLabel: 'Appointment List',
// };

const DrawerContent = props => (
  <View style={{ flex: 1, backgroundColor: Theme.grey }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'always' }}>
      <LogoutCard>
        <DrawerItems {...props} />
      </LogoutCard>
    </SafeAreaView>
  </View>
);

const MainDrawNavigator = createDrawerNavigator(
  {
    "Home something": ExploreStack,
    Appointmentttt: FormScreen,
  },
  {
    contentComponent: DrawerContent,
    drawerWidth: Layout.window.width - (Platform.OS === 'android' ? 56 : 64),
    contentOptions: {
      activeTintColor: Theme.activeTintColor,
      inactiveTintColor: Theme.inactiveTintColor,
      activeBackgroundColor: Theme.grey,
      style: {
        marginVertical: 0,
        flex: 1,
        backgroundColor: Theme.sidebar,
      },
      labelStyle: {
        fontWeight: 'bold',
        fontFamily: 'space-mono',
        // borderBottomColor: Theme.primary,
        // borderBottomWidth: 2,
        // backgroundColor: Theme.tint,
      }
    }
  }
);

export default MainDrawNavigator;
