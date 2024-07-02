import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import { THEME } from '../../../constants/theme';

const NameSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  return (
    <View style={styles.section}>
      <View>
        <Text style={titleStyle}>아이의 이름</Text>
        <TextInput
          placeholder="아이의 이름을 입력해주세요."
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default NameSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 12,
  },
  input: {
    width: '100%',
    paddingLeft: 20,
    paddingVertical: 18,
    borderRadius: 15,
    backgroundColor: THEME.COLOR.GRAY_2,
  },
});
