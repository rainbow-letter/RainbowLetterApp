import { StyleSheet, View } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

const ThickDivider = () => {
  return <View style={styles.divider} />;
};

export default ThickDivider;

const styles = StyleSheet.create({
  divider: {
    height: 10,
    backgroundColor: THEME.COLOR.GRAY_2,
  },
});
