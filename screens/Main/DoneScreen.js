import React from 'react';

import { View, Text } from 'react-native';

import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import DataList from 'components/cards/DataList';
import { ActivityIndicator, FAB } from 'react-native-paper';

import { getPatientsFromFire } from 'api/user';
import TopSearchBar from 'components/bars/TopSearchBar';
import { Theme, styles } from 'theme';

class DoneScreen extends React.Component {
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
    isFetching: false,
  };

  onRefresh = () => {
    this.setState({ isFetching: true });
    this.loadResourcesAsync();
  }

  loadResourcesAsync = async () => {
    await getPatientsFromFire();
    this.setState({ isFetching: false });
  };

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async componentWillMount() {
    try {
      await this.loadResourcesAsync();
    } catch (err) {
      await this.handleLoadingError(err);
    } finally {
      await this.handleFinishLoading();
    }
  }

  filterData = data => data.filter(item => item.attended !== false);

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const { data, navigation } = this.props;
      return (
        <View style={{ padding: 0, margin: 0, flex: 1, backgroundColor: Theme.background }}>
          <TopSearchBar title="Attended Patients" data={data} navigation={navigation} />
          <DataList
            data={this.filterData(data)}
            navigation={navigation}
            // inverted
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            noRecordsmessage="No patients records yet."
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
  data: state.data
});

export default connect(mapStateToProps)(DoneScreen);
