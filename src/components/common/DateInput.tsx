import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  placeholder: string;
  width: number;
  onChange: (date: string) => void;
  value?: string | null;
};

const DateInput = ({ placeholder, width, onChange, value }: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, { width }]}
      maxLength={placeholder.length}
      onChangeText={onChange}
      value={value ? value : ''}
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
