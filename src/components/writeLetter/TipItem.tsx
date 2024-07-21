import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Tip } from '../../model/Letter.model';
import { THEME } from '../../constants/theme';

const TipItem = ({ item }: { item: Tip }) => {
  return (
    <View style={styles.infoList}>
      <Text style={styles.prefix}>{item.prefix}</Text>
      <Text>{item.question}</Text>
    </View>
  );
};

export default TipItem;

const styles = StyleSheet.create({
  prefix: {
    fontSize: 18,
    color: THEME.COLOR.ORANGE_1,
  },
  question: {
    fontSize: 18,
  },
  infoList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
});
