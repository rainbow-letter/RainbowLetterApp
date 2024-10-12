import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Contents = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          uri: 'https://rainbowletter.co.kr/contents',
        }}
      />
    </SafeAreaView>
  );
};

export default Contents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
