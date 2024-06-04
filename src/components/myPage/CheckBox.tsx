import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import Check from '../../assets/ic_secession_check.svg';

type Props = {
  isCheck: boolean;
  setIsCheck: (isCheck: boolean) => void;
};

const CheckBox = ({ isCheck, setIsCheck }: Props) => {
  return (
    <Pressable style={styles.agreeButton} onPress={() => setIsCheck(!isCheck)}>
      <View
        style={isCheck ? [styles.checkBox, styles.checkedBox] : styles.checkBox}
      />
      <Check style={styles.check} />
      <Text style={styles.checkBoxText}>
        위 내용을 확인하였으며, 탈퇴를 진행합니다.
      </Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  agreeButton: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
  },
  check: {
    position: 'absolute',
  },
  checkBox: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 5,
    width: 24,
    height: 24,
    borderColor: THEME.COLOR.ORANGE_1,
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: THEME.COLOR.ORANGE_1,
  },
  checkBoxText: {
    color: THEME.COLOR.BLACK_1,
    fontSize: 16,
    fontWeight: '600',
  },
});
