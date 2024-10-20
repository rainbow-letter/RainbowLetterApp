import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  personailty: string;
};

const Tag = ({ personailty }: Props) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>#{personailty}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: THEME.COLOR.ORANGE_3,
  },
  tagText: {
    fontSize: 14,
    color: THEME.COLOR.ORANGE_1,
    lineHeight: 18,
  },
});
