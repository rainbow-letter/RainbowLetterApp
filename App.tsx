import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Appinner from './Appinner';

function App(): React.JSX.Element {
  console.log(Platform.OS);
  return (
    <SafeAreaProvider style={styles.container}>
      <Appinner />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
});

export default App;
