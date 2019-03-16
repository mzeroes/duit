import React from 'react';

import { View } from 'react-native';

import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import DataList from 'components/cards/DataList';
import { Appbar } from 'react-native-paper';

import { getAptsFromFire } from 'api/user';
import { TopSearchBar } from 'components';

console.ignoredYellowBox = [
  'Setting a timer'
];

class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isLoadingComplete: false,
    data: '',
    isFetching: false
  };

  onRefresh() {
    this.setState({ isFetching: true });
    this.loadResourcesAsync();
  }

  loadResourcesAsync = async () => {
    const data = await getAptsFromFire();
    this.setState({ data });
    this.setState({ isFetching: false });
  };

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
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
      const { data } = this.state;
      const { navigation } = this.props;
      return (
        <View style={{ padding: 0, margin: 0, flex: 1 }}>
          <TopSearchBar data={data} navigation={navigation} />
          <DataList
            data={data}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
          />
          <Appbar style={{
            position: 'absolute',
            borderRadius: 50,
            right: 10,
            bottom: 20,
          }}
          >
            <Appbar.Action
              icon="add"
              accessibilityLabel="Add a new appointment"
              onPress={() => this.props.navigation.navigate('Form')}
            />
          </Appbar>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ExploreScreen);
