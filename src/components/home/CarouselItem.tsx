import { StyleSheet, ViewStyle, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { THEME } from '../../constants/theme';
import Tape from '../../assets/ic_home_tape.svg';

interface IPage {
  item: any;
  style?: ViewStyle;
}

const linesLength = 4;
const lineHeight = 30;
const underlineHeight = 1;

const CarouselItem = ({ item: { type, petName, content }, style }: IPage) => {
  const prefix = type === 'letter' ? 'TO. ' : 'FROM. ';

  return (
    <View style={styles.letterWrap}>
      <View style={[styles.letter, style]}>
        <Tape style={styles.tape} />
        <Text style={styles.pet}>
          {prefix}
          {petName}
        </Text>
        <View>
          <Text style={[styles.content, { lineHeight }]}>{content}</Text>
          {Array.from({ length: linesLength }).map((_, index) => (
            <LinearGradient
              key={index}
              colors={['transparent', 'transparent', '#BDBDBD', '#BDBDBD']}
              style={[
                styles.underline,
                {
                  height: underlineHeight,
                  top: lineHeight * (index + 1) - underlineHeight,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  letterWrap: {
    position: 'relative',
    paddingTop: 10,
  },
  letter: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  tape: {
    position: 'absolute',
    top: -10,
  },
  pet: {
    fontSize: 14,
    paddingVertical: 18,
    color: THEME.COLOR.BLACK_1,
    fontFamily: 'KyoboHandwriting2019',
  },
  content: {
    fontSize: 14,
    height: 110,
    fontFamily: 'KyoboHandwriting2019',
    color: THEME.COLOR.BLACK_1,
  },
  underline: {
    position: 'absolute',
    width: '100%',
  },
});
