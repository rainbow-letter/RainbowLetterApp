import { StyleSheet, View } from 'react-native';
import React from 'react';
import { THEME } from '../../constants/theme';

const ThinDivider = () => {
  return <View style={styles.divider} />;
};

export default ThinDivider;

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    borderColor: THEME.COLOR.GRAY_5,
    marginHorizontal: 17,
  },
});
