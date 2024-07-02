import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import { PETS_PERSONALITY } from '../../../constants/Pet/Register';
import Chip from '../../common/Chip';
import { THEME } from '../../../constants/theme';

const PersonailtySection = ({ titleStyle }: StyledPetRegisterTitle) => {
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
            isSelected={false}
            onClick={() => console.log('s')}
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
