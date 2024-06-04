import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import GoBackSVGImage from '../../assets/ic_header_goBack.svg';

const TabGoBack = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      hitSlop={2}
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <GoBackSVGImage />
    </Pressable>
  );
};

export default TabGoBack;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
