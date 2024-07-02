import { StyleSheet, View } from 'react-native';
import React from 'react';

import Chip from '../common/Chip';

type Props = {
  petsNames: string[];
  onClick: (name: string) => void;
  selectedPet: string;
};

const NameSection = ({ petsNames, onClick, selectedPet }: Props) => {
  return (
    <View style={styles.petsNameWrap}>
      {petsNames.map(name => (
        <Chip
          key={`petsName-${name}`}
          value={name}
          isSelected={selectedPet === name}
          onClick={() => onClick(name)}
        />
      ))}
    </View>
  );
};

export default NameSection;

const styles = StyleSheet.create({
  petsNameWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
