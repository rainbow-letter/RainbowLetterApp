import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  isCheck?: boolean | string;
  style?: any;
};

const Button = ({ children, isCheck, onPress, style }: Props) => {
  return (
    <Pressable
      disabled={!isCheck}
      style={
        isCheck
          ? [style, styles.button, styles.buttonActive]
          : [style, styles.button]
      }
      onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: THEME.COLOR.GRAY_1,
    paddingVertical: 22,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonActive: {
    backgroundColor: THEME.COLOR.ORANGE_1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.COLOR.WHITE,
  },
});
