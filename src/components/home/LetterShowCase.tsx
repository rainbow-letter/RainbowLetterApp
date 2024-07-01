import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Carousel from './Carousel';
import { SHOWCASE_LETTERS } from './constants';
import { THEME } from '../../constants/theme';

const screenWidth = Math.round(Dimensions.get('window').width);

const LetterShowCase = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>무지개에 걸린 편지</Text>
      <View>
        <Carousel
          gap={10}
          offset={36}
          pages={SHOWCASE_LETTERS}
          pageWidth={(screenWidth - (10 + 36) * 2) / 2}
        />
      </View>
    </View>
  );
};

export default LetterShowCase;

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: 18,
  },
});
