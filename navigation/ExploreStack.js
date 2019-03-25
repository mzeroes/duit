import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

import DetailsScreen from 'screens/Main/DetailScreen';
import TabBarIcon from '../components/icons/TabBarIcon';
import ExploreScreen from '../screens/Main/ExploreScreen';
import SearchScreen from '../screens/Main/SearchScreen';

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
  Search: SearchScreen,
  Details: DetailsScreen
});

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  )
};

export default ExploreStack;
