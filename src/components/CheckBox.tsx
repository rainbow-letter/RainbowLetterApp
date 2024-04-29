import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';

import Check from '../assets/signUp_check.svg';
import { theme } from '../constants/theme';

type Props = {
  setIsChecked: (isChecked: boolean) => void;
};

type CheckListType = {
  id: number;
  name: string;
};

const CHECK_LIST: CheckListType[] = [
  { id: 0, name: '서비스 이용약관 동의' },
  { id: 1, name: '개인정보 처리방침 동의' },
];

const CheckBox = ({ setIsChecked }: Props) => {
  const [checkItems, setCheckItems] = useState<string[]>([]);

  const handleAllCheck = useCallback(() => {
    setCheckItems(CHECK_LIST.map(item => item.name));
  }, []);

  console.log(checkItems);
  return (
    <View style={styles.agreeContainer}>
      <View style={[styles.AgreeBox, styles.allAgreeBox]}>
        <Pressable style={styles.agreeButton} onPress={handleAllCheck}>
          <View style={styles.checkBox} />
          <Check style={styles.check} />
          <Text style={[styles.checkBoxText, styles.allAgreeText]}>
            전체 동의
          </Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.AgreeBox}>
          <Pressable style={styles.agreeButton}>
            <View style={styles.checkBox} />
            <Check style={styles.check} />
            <Text style={styles.checkBoxText}>서비스 이용약관 동의</Text>
          </Pressable>
        </View>
        <View style={styles.AgreeBox}>
          <Pressable style={styles.agreeButton}>
            <View style={styles.checkBox} />
            <Check style={styles.check} />
            <Text style={styles.checkBoxText}>개인정보 처리방침 동의</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  agreeContainer: {
    paddingTop: 20,
    paddingBottom: 25,
  },
  AgreeBox: {
    paddingHorizontal: 23,
    borderRadius: 15,
    marginTop: 13,
  },
  allAgreeBox: {
    backgroundColor: theme.color.gray2,
    paddingVertical: 15,
  },
  allAgreeText: {
    fontWeight: '500',
  },
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
    borderColor: theme.color.orange,
    backgroundColor: theme.color.orange,
  },
  checkBoxText: {
    color: theme.color.black1,
  },
});
