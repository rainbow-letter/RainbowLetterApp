import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import { THEME } from '../../../constants/theme';
import PetRegisterSlice from '../../../slices/pets';
import { RootState } from '../../../store/reducer';

const NameSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const { name } = useSelector((state: RootState) => state.petRegister);
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
        {name && (
          <Text style={styles.alarmText}>이름은 나중에 수정할 수 없어요.</Text>
        )}
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
  alarmText: {
    color: THEME.COLOR.RED_1,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 14,
  },
});
