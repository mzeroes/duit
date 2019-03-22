import React from 'react';
import { View, TouchableOpacity, } from 'react-native';

import { AppLoading } from 'expo';

import { SearchBar, Text } from 'react-native-elements';

import { Theme } from 'theme';
import DataList from 'components/cards/DataList';
import { ActivityIndicator } from 'react-native-paper';
import TabBarIcon from 'components/icons/TabBarIcon';

const TopSearchBar = props => (
  <View style={{ flexDirection: 'row', backgroundColor: Theme.statusbar }}>
    <TouchableOpacity
      onPress={() => {
        props.navigation.goBack();
      }}
      style={
        {
          padding: 10
        }
      }
    >
      {/* <Icon.Ionicons
        style={{ marginLeft: 12, color: Theme.text, padding: 4 }}
        name="md-arrow-back"
        size={28}
      /> */}
      <TabBarIcon
        name="md-arrow-back"
        size={props.iconsize || 28}
      />
    </TouchableOpacity>
    <SearchBar
      // platform={Platform.OS}
      autoFocus
      autoCapitalize="none"
      containerStyle={{
        backgroundColor: Theme.statusbar,
        padding: 4,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1
      }}
      inputContainerStyle={{
        backgroundColor: Theme.statusbar
      }}
      searchIcon={null}
      lightTheme
      placeholder="Search"
      onChangeText={props.updateSearch}
      value={props.search}
    />
  </View>
);

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: <TopSearchBar search={this.search} updateSearch={this.updateSearch} />,
    // headerStyle: styles.headerStyle,
    // headerTintColor: Theme.tintColor,
    // headerTitleStyle: {
    //   fontWeight: 'normal'
    // },
  }


  state = {
    isLoadingComplete: false,
    search: '',
    data: ''
  };

  loadResourcesAsync = async () => {
    const data = this.props.navigation.getParam('data', '');
    this.setState({ data });
  };

  handleLoadingError = (error) => {
    console.warn(`handleLoadingError :: ${error}`);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  filterData = (data) => {
    if (data !== '') {
      const datafilter = data.filter((obj) => {
        let temp = 0;
        // TODO: Absraction
        // if (obj) {
        //   Object.keys(obj).forEach((key) => {
        //     temp += obj[key].includes(this.state.search);
        //   });
        // }

        if (obj.Phone) temp += obj.Phone.includes(this.state.search);
        if (obj.Name) temp += obj.Name.includes(this.state.search);
        if (obj.Email) temp += obj.Email.includes(this.state.search);
        if (obj.Problem) temp += obj.Problem.includes(this.state.search);

        // let byPhone; let byName; let byEmail;
        // if (!obj.Phone) byPhone = false;
        // else byPhone = obj.Phone.includes(this.state.search);
        // if (!obj.Name) byName = false;
        // else byName = obj.Name.includes(this.state.search);
        // if (!obj.Email) byEmail = false;
        // else byEmail = obj.Email.includes(this.state.search);
        return temp !== 0;
      });
      return datafilter;
    }
    return '';
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppLoading
            startAsync={this.loadResourcesAsync}
            onError={this.handleLoadingError}
            onFinish={this.handleFinishLoading}
          />
          <ActivityIndicator />
        </View>
      );
    } else {
      const { search, data } = this.state;
      return (
        <View style={{
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: Theme.background,
        }}
        >
          <TopSearchBar
            navigation={this.props.navigation}
            search={search}
            updateSearch={this.updateSearch}
          />
          {this.state.search === '' ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 100
            }}
            >
              <Text>Search records.</Text>
            </View>
          ) : (
            <View>
              {this.state.data === '' && (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 100
              }}
              >
                <Text>No Such patient records exists.</Text>
              </View>
              )}
              <DataList data={this.filterData(data)} />
            </View>
          )
          }
        </View>
      );
    }
  }
}
