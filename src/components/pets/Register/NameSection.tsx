import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import { THEME } from '../../../constants/theme';
import PetRegisterSlice from '../../../slices/pets';

const NameSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const dispatch = useDispatch();

  const handleInputName = useCallback(
    (value: string) => {
      const action = PetRegisterSlice.actions.setPetInfo({
        name: value,
      });
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <View>
        <Text style={titleStyle}>아이의 이름</Text>
        <TextInput
          placeholder="아이의 이름을 입력해주세요."
          autoCapitalize="none"
          style={styles.input}
          onChangeText={handleInputName}
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
