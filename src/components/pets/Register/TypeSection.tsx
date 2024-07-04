import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_TYPE } from '../../../constants/Pet/Register';
import { useDispatch, useSelector } from 'react-redux';
import PetRegisterSlice from '../../../slices/pets';
import { RootState } from '../../../store/reducer';

const TypeSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const dispatch = useDispatch();
  const { species } = useSelector((state: RootState) => state.petRegister);

  const handleCheckType = useCallback(
    (species: string) => {
      const action = PetRegisterSlice.actions.setPetInfo({
        species,
      });
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이의 종류</Text>
      <View style={styles.typeWrap}>
        {PETS_TYPE.map(type => (
          <Chip
            key={`pets-type-${type}`}
            value={type}
            isSelected={species === type}
            onClick={() => handleCheckType(type)}
          />
        ))}
        <Chip
          value="기타"
          isSelected={false}
          onClick={() => console.log('s')}
        />
      </View>
    </View>
  );
};

export default TypeSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 35,
  },
  typeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
