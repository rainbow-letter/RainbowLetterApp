import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LetterShowCase = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          uri: 'https://rainbowletter.co.kr/web-view/letter-showcase',
        }}
      />
    </SafeAreaView>
  );
};

export default LetterShowCase;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 280,
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
