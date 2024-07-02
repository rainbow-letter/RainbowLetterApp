import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  placeholder: string;
  width: number;
};

const DateInput = ({ placeholder, width }: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, { width }]}
      maxLength={placeholder.length}
    />
  );
};

export default DateInput;

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: THEME.COLOR.GRAY_2,
  },
});
