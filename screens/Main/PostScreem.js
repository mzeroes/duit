import React, { Component } from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ImagePicker, Permissions, Alert } from 'expo';
import { uploadImageAsync } from 'utils/uploadPhoto';
import { Theme } from 'theme';
import TabBarIcon from 'components/icons/IconWrap';
import Layout from 'theme/constants/Layout';
import { Avatar } from 'react-native-paper';

export default class PostScreen extends Component {
  static navigationOptions = {
    title: 'Upload image'
  };

  state = {
    image: '',
    uploading: false
  };

  maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <View />;
  };

  share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image
    });
  };

  copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    Alert.alert('Copied image URL to clipboard');
  };

  takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      this.handleImagePicked(pickerResult);
    }
  };

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async (pickerResult) => {
    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        const uploadResponse = await uploadImageAsync(
          pickerResult.uri
        );
        // uploadResult = await uploadResponse.json();
        await this.setState({
          image: uploadResponse
        });
        console.warn(`STATE ::: ${this.state.image}`);
      }
    } catch (err) {
      console.warn(`ERROR :: ${{ err }}`);
      Alert.alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        { image !== '' ? (
          <View style={styles.maybeRenderContainer}>
            <Image source={{ uri: image }} style={styles.maybeRenderImage} />
          </View>
        )
          : (
            <TouchableOpacity
              onPress={image ? this.copyToClipboard : this.takePhoto}
              onLongPress={image ? this.share : this.pickImage}
              style={styles.maybeRenderImageText}
            >
              <Avatar.Icon
                icon="add-a-photo"
                size={40}
              >
              </Avatar.Icon>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingContainer: {
    borderColor: Theme.statusbar,
    backgroundColor: Theme.statusbar
  },
  headText: {
    // margin: 20,
    fontSize: 14,
    color: Theme.dark
  },
  maybeRenderUploading: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.statusbar
  },
  maybeRenderContainer: {
    justifyContent: 'center'
  },
  touchableButton: {
    backgroundColor: Theme.statusbar,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  monoText: {
    fontSize: 17,
    color: Theme.infoText,
    textAlign: 'center',
    fontFamily: 'space-mono'
  },
  maybeRenderImageContainer: {},
  maybeRenderImage: {
    width: Layout.window.width,
    height: Layout.window.width,
    maxWidth: '100%',
    maxHeight: '100%'
  },
  maybeRenderImageText: {
    // alignItems: 'center'
  }
});
