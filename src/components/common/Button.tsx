import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

import { theme } from '../../constants/theme';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  isCheck?: boolean | string;
  style?: any;
};

const Button = ({ children, isCheck, onPress }: Props) => {
  return (
    <Pressable
      disabled={!isCheck}
      style={isCheck ? [styles.button, styles.buttonActive] : styles.button}
      onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: theme.color.gray1,
    paddingVertical: 22,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonActive: {
    backgroundColor: theme.color.orange,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.color.white,
  },
});
