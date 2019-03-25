import React from 'react';

import { View, Text } from 'react-native';

import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import DataList from 'components/cards/DataList';
import { ActivityIndicator, FAB } from 'react-native-paper';

import { getPatientsFromFire } from 'api/user';
import TopSearchBar from 'components/bars/TopSearchBar';
import { Theme, styles } from 'theme';

class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  state = {
    isLoadingComplete: false,
    data: '',
    isFetching: false,
  };

  onRefresh = () => {
    this.setState({ isFetching: true });
    this.loadResourcesAsync();
  }

  loadResourcesAsync = async () => {
    console.warn("About to call getPatientsFromFire")
    const data = await getPatientsFromFire();
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
      const { data } = this.state;
      const { navigation } = this.props;
      // if (!data){
      //   return(
      //     <View style={{ justifyContent:"center", alignItems:"center" }}>
      //       <Text>No appointments yet.</Text>
      //     </View>
      //   )
      // }
      return (
        <View style={{ padding: 0, margin: 0, flex: 1, backgroundColor: Theme.background }}>
          <TopSearchBar data={data} navigation={navigation} />         
          <DataList
            data={data}
              // inverted
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
          />
          <FabComponent
            navigate={this.props.navigation.navigate}
            onRefresh={this.onRefresh}
          />
        </View>
      );
    }
  }
}

const FabComponent = props => (
  <FAB
    style={styles.fab}
    icon="add"
    onPress={
      () => {
        props.navigate('Appointment', {
          onNavigateBack: props.onRefresh
        });
      }}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ExploreScreen);
