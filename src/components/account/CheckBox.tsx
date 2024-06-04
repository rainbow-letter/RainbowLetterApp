import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import Check from '../../assets/ic_signUp_check.svg';

type Props = {
  item: string[];
  text: string;
  onClick: (text: string) => void;
};

const CheckBox = ({ item, text, onClick }: Props) => {
  return (
    <Pressable style={styles.agreeButton} onPress={() => onClick(text)}>
      <View
        style={
          !item.includes(text)
            ? styles.checkBox
            : [styles.checkBox, styles.checkedBox]
        }
      />
      <Check style={styles.check} />
      <Text style={styles.checkBoxText}>{text}</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  agreeButton: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  check: {
    position: 'absolute',
    left: 1,
    top: 0,
  },
  checkBox: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 5,
    width: 20,
    height: 20,
    borderColor: THEME.COLOR.ORANGE_1,
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: THEME.COLOR.ORANGE_1,
  },
  checkBoxText: {
    color: THEME.COLOR.BLACK_1,
  },
});
