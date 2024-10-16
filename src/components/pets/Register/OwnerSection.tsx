import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_OWNERS } from '../../../constants/Pet/Register';
import { RootState } from '../../../store/reducer';
import PetRegisterSlice from '../../../slices/pets';
import AnimatedChip from '../../common/AnimatedChip';

const OwnerSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const { owner } = useSelector((state: RootState) => state.petRegister);
  const [isEtcCheck, setIsEtcCheck] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleCheckOwner = useCallback(
    (owner: string) => {
      setIsEtcCheck(false);

      const action = PetRegisterSlice.actions.setPetInfo({
        owner,
      });
      dispatch(action);
    },
    [dispatch],
  );

  const handleEtcInput = useCallback(
    (value: string) => {
      const action = PetRegisterSlice.actions.setPetInfo({
        owner: value,
      });
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이에게 당신은</Text>
      <View style={styles.etcWrap}>
        <View style={styles.masterWrap}>
          {PETS_OWNERS.map(item => (
            <Chip
              key={`pets-owner-${item}`}
              value={item}
              isSelected={item === owner && !isEtcCheck && owner !== ''}
              onClick={() => handleCheckOwner(item)}
            />
          ))}
        </View>
        <AnimatedChip
          isCheck={owner !== '' && !PETS_OWNERS.includes(owner ?? '')}
          value={
            owner !== '' && !PETS_OWNERS.includes(owner ?? '') ? owner : ''
          }
          onClick={() => setIsEtcCheck(true)}
          onChange={handleEtcInput}
        />
      </View>
    </View>
  );
};

export default OwnerSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 35,
  },
  etcWrap: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  masterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
