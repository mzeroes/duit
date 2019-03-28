import React from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';

import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
  createNavigationContainer,
  createAppContainer
} from 'react-navigation';

import { Theme, styles } from 'theme';
import Layout from 'theme/constants/Layout';
import { onPressLogoutAsync } from 'utils';

import LogoutCard from 'components/cards/LogoutCard';

import FormScreen from '../screens/Main/FormScreen';
import ExploreStack from './ExploreStack';

// const ExploreNav = ExploreStack;
// ExploreNav.navigationOptions = {
//   drawerLabel: 'Appointment List',
// };
export const TermsLogoutCard = () => (
  <TouchableOpacity
    style={{
      padding: 18
    }}
    onPress={() => { onPressLogoutAsync(); }}
  >
    <Text style={[{ color: Theme.darkText, fontWeight: 'bold' }]}>Logout</Text>
  </TouchableOpacity>
);

const DrawerContent = props => (
  <View style={{ flex: 1, backgroundColor: Theme.grey }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'always' }}>
      <LogoutCard />
      <DrawerItems {...props} />
      <TermsLogoutCard />
    </SafeAreaView>
  </View>
);

const MainDrawNavigator = createDrawerNavigator(
  {
    'Patients List': ExploreStack,
  },
  {
    contentComponent: DrawerContent,
    drawerWidth: Layout.window.width - (Platform.OS === 'android' ? 56 : 64),
    contentOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#000',
      activeBackgroundColor: '#ccc',
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
