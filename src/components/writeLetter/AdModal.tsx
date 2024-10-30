import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Cancel from '../../assets/ic_modal_cancel.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {
  handleModal: () => void;
};

const AdModal = ({ handleModal }: Props) => {
  const handleWebViewMessage = (event: any) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.url) {
        Linking.openURL(messageData.url);
        handleModal();
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid message data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <WebView
          style={styles.webview}
          onMessage={handleWebViewMessage}
          source={{
            uri: 'https://rainbowletter.co.kr/web-view/ad-modal',
          }}
        />
        <Pressable onPress={handleModal} style={styles.cancelBtn}>
          <Cancel />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AdModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight - 160,
  },
  webview: {
    flex: 1,
    width: windowWidth - 16,
    height: windowHeight,
    borderRadius: 15,
  },
  cancelBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});
