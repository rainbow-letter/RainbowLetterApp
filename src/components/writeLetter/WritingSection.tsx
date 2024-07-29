import { StyleSheet, View, Text, TextInput } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WriteLetterSlice from '../../slices/writeLetter';
import { THEME } from '../../constants/theme';
import { RootState } from '../../store/reducer';

const WritingSection = () => {
  const { name } = useSelector((state: RootState) => state.petSelect);
  const { content } = useSelector((state: RootState) => state.writeLetter);
  const dispatch = useDispatch();

  const handleInputLetter = useCallback(
    (value: string) => {
      const action = WriteLetterSlice.actions.setLetter({
        content: value,
        summary: value.slice(0, 20),
      });
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <View style={styles.pad}>
        <Text style={styles.petNameText}>{name}에게</Text>
        <TextInput
          style={styles.padText}
          onChangeText={handleInputLetter}
          multiline
          value={content}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

export default WritingSection;

const styles = StyleSheet.create({
  section: {
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
