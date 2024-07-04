import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_OWNERS } from '../../../constants/Pet/Register';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import PetRegisterSlice from '../../../slices/pets';

const OwnerSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const dispatch = useDispatch();
  const { owner } = useSelector((state: RootState) => state.petRegister);

  const handleCheckOwner = useCallback(
    (owner: string) => {
      const action = PetRegisterSlice.actions.setPetInfo({
        owner,
      });
      dispatch(action);
    },
    [dispatch],
  );
  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이에게 당신은</Text>
      <View style={styles.masterWrap}>
        {PETS_OWNERS.map(item => (
          <Chip
            key={`pets-owner-${item}`}
            value={item}
            isSelected={item === owner}
            onClick={() => handleCheckOwner(item)}
          />
        ))}
      </View>
    </View>
  );
};

export default OwnerSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 35,
  },
  masterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
