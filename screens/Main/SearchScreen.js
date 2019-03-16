import React from 'react';
import { View } from 'react-native';

import { AppLoading } from 'expo';

import { SearchBar } from 'react-native-elements';

import { Theme } from 'theme';
import DataList from 'components/cards/DataList';

const TopSearchBar = props => (
  <SearchBar
    autoFocus
    containerStyle={{
      backgroundColor: Theme.statusbar,
      padding: 4,
      borderTopWidth: 0,
      borderBottomWidth: 0
    }}
    inputContainerStyle={{
      backgroundColor: Theme.grey
    }}
    lightTheme
    placeholder="Search"
    onChangeText={props.updateSearch}
    value={props.search}
  />
);

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isLoadingComplete: false,
    search: '',
    data: ''
  };

  loadResourcesAsync = async () => {
    const data = this.props.navigation.getParam('data', 'LOL');
    // console.warn(`Test :: ${JSON.stringify(data)}`);
    this.setState({ data });
  };

  handleLoadingError = (error) => {
    console.warn(`handleLoadingError :: ${error}`);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  filterData = (data) => {
    const temp = data.filter(elem => elem.Phone.includes(this.state.search));
    return temp;
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    } else {
      const { search, data } = this.state;
      return (
        <View style={{ padding: 0, margin: 0, flex: 1 }}>
          <TopSearchBar search={search} updateSearch={this.updateSearch} />
          <DataList data={this.filterData(data)} />
        </View>
      );
    }
  }
}
