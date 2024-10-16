import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import { PETS_PERSONALITY } from '../../../constants/Pet/Register';
import Chip from '../../common/Chip';
import { THEME } from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import PetRegisterSlice from '../../../slices/pets';
import { RootState } from '../../../store/reducer';

const PersonailtySection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const dispatch = useDispatch();
  const { personalities } = useSelector(
    (state: RootState) => state.petRegister,
  );

  const handleCheckPersonailty = useCallback(
    (personality: string) => {
      if (personalities && personalities.includes(personality)) {
        const updateList = personalities.filter(item => item !== personality);
        const action = PetRegisterSlice.actions.setPetInfo({
          personalities: updateList,
        });
        return dispatch(action);
      }
      if (personalities && personalities.length >= 3) {
        return;
      }

      const updateList = personalities && [...personalities, personality];
      const action = PetRegisterSlice.actions.setPetInfo({
        personalities: updateList,
      });
      dispatch(action);
    },
    [dispatch, personalities],
  );

  return (
    <View style={styles.section}>
      <View style={styles.titleWrap}>
        <Text style={titleStyle}>아이의 평소 성격은 (최대 3개)</Text>
        <Text style={[titleStyle, styles.choiceText]}>(선택)</Text>
      </View>
      <View style={styles.personailtyWrap}>
        {PETS_PERSONALITY.map(personailty => (
          <Chip
            key={`pets-personailty-${personailty}`}
            value={personailty}
            isSelected={personalities && personalities.includes(personailty)}
            onClick={() => handleCheckPersonailty(personailty)}
          />
        ))}
      </View>
    </View>
  );
};

export default PersonailtySection;

const styles = StyleSheet.create({
  section: {
    marginTop: 37,
  },
  titleWrap: {
    flexDirection: 'row',
    gap: 4,
  },
  choiceText: {
    color: THEME.COLOR.GRAY_1,
  },
  personailtyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
