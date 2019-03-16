import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Theme } from 'theme';
import TabBarIcon from 'components/icons/TabBarIcon';
import { TopBar } from './TopBar';

class TopSearchBar extends React.Component {
  render() {
    const { navigation, data } = this.props;
    return (

      <TopBar iconsize={14}>
        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingLeft: 12,
            flex: 1,
            alignItems: 'center',
            backgroundColor: Theme.grey
          }}
          onPress={() => {
            navigation.navigate('Search', { data });
          }}
        >
          <TabBarIcon name="ios-search" size={17} />
          <Text
            style={{
              textAlign: 'left',
              paddingLeft: 8,
              color: '#999',
              // fontWidth: 'bold'
              fontSize: 18
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </TopBar>
    );
  }
}

export default TopSearchBar;
