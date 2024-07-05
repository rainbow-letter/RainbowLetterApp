import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_TYPE } from '../../../constants/Pet/Register';
import PetRegisterSlice from '../../../slices/pets';
import { RootState } from '../../../store/reducer';
import AnimatedChip from '../../common/AnimatedChip';

const TypeSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const [isEtcCheck, setIsEtcCheck] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { species } = useSelector((state: RootState) => state.petRegister);

  const handleCheckType = useCallback(
    (species: string) => {
      setIsEtcCheck(false);

      const action = PetRegisterSlice.actions.setPetInfo({
        species,
      });
      dispatch(action);
    },
    [dispatch],
  );

  const handleEtcInput = useCallback(
    (value: string) => {
      const action = PetRegisterSlice.actions.setPetInfo({
        species: value,
      });
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이의 종류</Text>
      <View style={styles.etcWrap}>
        <View style={styles.typeWrap}>
          {PETS_TYPE.map(type => (
            <Chip
              key={`pets-type-${type}`}
              value={type}
              isSelected={species === type && !isEtcCheck}
              onClick={() => handleCheckType(type)}
            />
          ))}
        </View>
        <AnimatedChip
          isCheck={isEtcCheck}
          onClick={() => setIsEtcCheck(true)}
          onChange={handleEtcInput}
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
  etcWrap: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  typeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
