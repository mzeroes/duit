import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import { TouchableOpacity } from 'react-native';

import Icon from 'expo';
import { Theme, styles } from 'theme';
import MainDrawNavigator from './MainDrawNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import OnboardingScreen from '../screens/Auth/OnBoardingScreen';
import SignInProvidersScreen from '../screens/Auth/SignInProvidersScreen';
import PhoneAuthScreen from '../screens/Auth/PhoneAuthScreen';

const AuthStack = createStackNavigator(
  {
    OnBoard: OnboardingScreen,
    SignUp: SignUpScreen,
    PhoneAuth: PhoneAuthScreen,
    Providers: SignInProvidersScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: Theme.tintColor,
      headerTitleStyle: {
        fontWeight: 'normal'
      },
      headerLeft: navigation.order === 0 && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon.Ionicons
            style={{ alignItems: 'flex-start', marginLeft: 26 }}
            name="ios-arrow-back"
            size={24}
          />
        </TouchableOpacity>
      )
    }),
    initialRouteName: 'OnBoard'
  }
);

const AppNav = createSwitchNavigator(
  {
    App: MainDrawNavigator,
    Auth: AuthStack,
    Loading: AuthLoadingScreen
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNav);
