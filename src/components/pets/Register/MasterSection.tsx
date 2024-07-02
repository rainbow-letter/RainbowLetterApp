import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Chip from '../../common/Chip';
import { PETS_MASTER } from '../../../constants/Pet/Register';

const MasterSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  return (
    <View style={styles.section}>
      <Text style={titleStyle}>아이에게 당신은</Text>
      <View style={styles.masterWrap}>
        {PETS_MASTER.map(master => (
          <Chip
            key={`pets-master-${master}`}
            value={master}
            isSelected={false}
            onClick={() => console.log('s')}
          />
        ))}
      </View>
    </View>
  );
};

export default MasterSection;

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
