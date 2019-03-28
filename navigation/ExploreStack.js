import React from 'react';
import { Platform, Text, View } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';
import { Theme } from 'theme';

import DetailsScreen from 'screens/Main/DetailScreen';
import FormScreen from '../screens/Main/FormScreen';
import TabBarIcon from '../components/icons/TabBarIcon';
import ExploreScreen from '../screens/Main/ExploreScreen';
import DoneScreen from '../screens/Main/DoneScreen';

import SearchScreen from '../screens/Main/SearchScreen';

const ExploreTab = createMaterialBottomTabNavigator(
  {
    Active: ExploreScreen,
    Done: DoneScreen
  },
  {
    // activeColor: Theme.activeTintColor,
    // inactiveColor: Theme.inactiveTintColor,
    activeColor: Theme.tabIconSelected,
    inactiveColor: Theme.tabIconDefault,
    barStyle: {
      backgroundColor: Theme.statusbar,
    }
  }
);

ExploreTab.navigationOptions = {
  header: null
};

const ExploreStack = createStackNavigator({
  Explore: ExploreTab,
  Search: SearchScreen,
  Details: DetailsScreen,
  Appointment: FormScreen,
});


ExploreScreen.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <View style={
      focused
        ? {
          // flex: 1,
          // borderTopColor: Theme.tabYellow,
          // borderTopWidth: 3
        } : {

        }
    }
    >
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
      />
    </View>

  )
};

DoneScreen.navigationOptions = {
  tabBarLabel: 'Done',
  tabBarIcon: ({ focused }) => (
    <View style={
      focused
        ? {
          // flex: 1,
          // borderTopColor: Theme.tabYellow,
          // borderTopWidth: 3
        } : {

        }
  }
    >
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-archive' : 'md-archive'}
      />
    </View>
  )
};
export default ExploreStack;
