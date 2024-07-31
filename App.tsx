import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Appinner from './Appinner';
import store from './src/store';

function App(): React.JSX.Element {
  console.log(Platform.OS);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <Appinner />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default App;
