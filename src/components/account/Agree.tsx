import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';

import CheckBox from './CheckBox';
import Check from '../../assets/ic_signUp_check.svg';
import { theme } from '../../constants/theme';

type Props = {
  isChecked: boolean;
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

const Agree = ({ isChecked, setIsChecked }: Props) => {
  const [checkItems, setCheckItems] = useState<string[]>([]);

  useEffect(() => {
    if (checkItems.length === CHECK_LIST.length) {
      return setIsChecked(true);
    }

    return setIsChecked(false);
  }, [checkItems, setIsChecked]);

  const handleAllCheck = useCallback(() => {
    if (!isChecked) {
      return setCheckItems(CHECK_LIST.map(item => item.name));
    }

    return setCheckItems([]);
  }, [isChecked]);

  const handleSingleCheck = useCallback(
    (text: string) => {
      if (!checkItems.includes(text)) {
        return setCheckItems(prev => [...prev, text]);
      }

      return setCheckItems(checkItems.filter(item => item !== text));
    },
    [checkItems],
  );

  return (
    <View style={styles.agreeContainer}>
      <View style={[styles.AgreeBox, styles.allAgreeBox]}>
        <Pressable
          hitSlop={2}
          style={styles.agreeButton}
          onPress={handleAllCheck}>
          <View
            style={
              !isChecked
                ? styles.checkBox
                : [styles.checkBox, styles.checkedBox]
            }
          />
          <Check style={styles.check} />
          <Text style={[styles.checkBoxText, styles.allAgreeText]}>
            전체 동의
          </Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.AgreeBox}>
          <CheckBox
            item={checkItems}
            text={CHECK_LIST[0].name}
            onClick={handleSingleCheck}
          />
        </View>
        <View style={styles.AgreeBox}>
          <CheckBox
            item={checkItems}
            text={CHECK_LIST[1].name}
            onClick={handleSingleCheck}
          />
        </View>
      </View>
    </View>
  );
};

export default Agree;

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
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: theme.color.orange,
  },
  checkBoxText: {
    color: theme.color.black1,
  },
});
