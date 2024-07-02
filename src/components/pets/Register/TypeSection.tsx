import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_TYPE } from '../../../constants/Pet/Register';

const TypeSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이의 종류</Text>
      <View style={styles.typeWrap}>
        {PETS_TYPE.map(type => (
          <Chip
            key={`pets-type-${type}`}
            value={type}
            isSelected={false}
            onClick={() => console.log('s')}
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
