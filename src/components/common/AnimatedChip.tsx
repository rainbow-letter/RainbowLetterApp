import {
  View,
  Animated,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  isCheck: boolean;
  onClick: () => void;
  onChange?: (value: string) => void;
  value?: string;
};

const AnimatedChip = ({ isCheck, onClick, onChange, value }: Props) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const [isFoucs, setIsFocus] = useState(false);

  const handleFocus = useCallback(() => {
    Animated.timing(widthAnim, {
      toValue: 150,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [widthAnim]);

  const handleBlur = useCallback(() => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [widthAnim]);

  useEffect(() => {
    if (!isCheck) {
      return handleBlur();
    }

    return handleFocus();
  }, [isCheck, handleBlur, handleFocus]);

  return (
    <View>
      <Pressable
        style={
          !isCheck ? styles.container : [styles.container, styles.selectedChip]
        }
        onPress={onClick}>
        <Text
          style={
            !isCheck
              ? styles.chipText
              : [styles.chipText, styles.selectedChipText]
          }>
          기타
        </Text>
        {isCheck && <Text style={styles.divide}>:</Text>}
        <Animated.View style={{ width: widthAnim }}>
          <TextInput
            onChangeText={onChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={value}
          />
        </Animated.View>
      </Pressable>
      {isFoucs && isCheck && (
        <Text style={styles.alarmText}>10글자 이내로 입력해주세요.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedChip: {
    borderColor: THEME.COLOR.ORANGE_1,
    backgroundColor: THEME.COLOR.ORANGE_3,
  },
  selectedChipText: {
    color: THEME.COLOR.ORANGE_1,
    fontWeight: 'bold',
  },
  container: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    paddingHorizontal: 17,
  },
  divide: {
    marginHorizontal: 8,
    color: THEME.COLOR.ORANGE_1,
    fontWeight: 'bold',
  },
  chipText: {
    color: THEME.COLOR.BLACK_1,
    fontSize: 14,
  },
  alarmText: {
    color: THEME.COLOR.RED_1,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 14,
  },
});

export default AnimatedChip;
