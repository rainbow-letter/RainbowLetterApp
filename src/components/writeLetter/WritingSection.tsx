import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { THEME } from '../../constants/theme';
import { RootState } from '../../store/reducer';

const WritingSection = () => {
  const pet = useSelector((state: RootState) => state.petSelect);

  return (
    <View style={styles.section}>
      <View style={styles.pad}>
        <Text style={styles.petNameText}>{pet.name}에게</Text>
        <TextInput style={styles.padText} multiline />
      </View>
    </View>
  );
};

export default WritingSection;

const styles = StyleSheet.create({
  section: {
    // position: 'absolute',
    width: '100%',
    paddingTop: 242,
  },
  pad: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    paddingVertical: 42,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  petNameText: {
    fontSize: 20,
    fontFamily: 'KyoboHandwriting2019',
  },
  padText: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'KyoboHandwriting2019',
    minHeight: 344,
    lineHeight: 40,
  },
});
