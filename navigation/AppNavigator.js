import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import { TouchableOpacity, Platform } from 'react-native';

import Icon from 'expo';
import { Theme, styles } from 'theme';
import TabBarIcon from 'components';
import EmailConfirmScreen from 'screens/Auth/EmailConfirmScreen';
import MainDrawNavigator from './MainDrawNavigator';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import OnboardingScreen from '../screens/Auth/OnBoardingScreen';
import SignInProvidersScreen from '../screens/Auth/SignInProvidersScreen';
import PhoneAuthScreen from '../screens/Auth/PhoneAuthScreen';

const SignUpStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
    EmailConfirm: EmailConfirmScreen
  }
);
const LogInStack = createStackNavigator(
  {
    LogIn: SignInProvidersScreen,
  }
);

const LogInTab = createMaterialTopTabNavigator(
  {
    LogIn: LogInStack,
    SignUp: SignUpStack,
  }, {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: Theme.primary
      },
      tabStyle: {
        // width: 100,
        // borderBottomColor: Theme.green
      },
      style: {
        backgroundColor: Theme.statusbar,
      },
      indicatorStyle: {
        backgroundColor: Theme.primary,
      }
    }
  }
);

LogInTab.navigationOptions = {
  header: null,
};

const AuthStack = createStackNavigator(
  {
    
    // SignUp: SignUpScreen,
    
    Providers: LogInTab,
    PhoneAuth: PhoneAuthScreen,
    OnBoard: OnboardingScreen,
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
    // initialRouteName: 'OnBoard'
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
