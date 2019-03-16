import React from 'react';
import { View, Modal, Text } from 'react-native';
import AnimatedBG from 'components/background/AnimatedBG';

const animationfile = require('assets/animations/LoaderSquare.json');

class SmartLoader extends React.Component {
  state = {
    errorMessage: null
  };

  componentDidMount() {
    setTimeout(this.onTimeOutReached, this.props.timeOut || 2000);
  }

  onTimeOutReached = () => {
    this.setState({ errorMessage: 'TimeOutReached' });
    if (this.props.onTimeOutCallback) {
      this.props.onTimeOutCallback();
    }
  };

  render() {
    const { isLoading } = this.props;

    return (
      <Modal
        transparent
        animationType="fade"
        visible={isLoading}
        onRequestClose={() => {
          console.log('Closing...');
        }}
      >
        <AnimatedBG
          animationContainer={{
            position: 'absolute',
            height: '30%',
            width: '100%'
          }}
          animationStyle={{
            width: '100%',
            height: '100%',
            alignSelf: 'flex-end'
          }}
          animationfile={animationfile}
        >
          {this.state.errorMessage && (
            <View
              style={{
                fontSize: 20,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 14 }}>{this.state.errorMessage}</Text>
            </View>
          )}
        </AnimatedBG>
      </Modal>
    );
  }
}

export default SmartLoader;
