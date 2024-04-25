import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Appinner = () => {
  return (
    <SafeAreaView>
      <WebView
        style={styles.webview}
        source={{ uri: 'https://rainbowletter.co.kr' }}
      />
    </SafeAreaView>
  );
};

export default Appinner;

const styles = StyleSheet.create({
  webview: { flex: 1, width: windowWidth, height: windowHeight },
});
