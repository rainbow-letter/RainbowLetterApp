import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { THEME } from '../../constants/theme';

type Props = {
  petsNames: string[];
  onClick: (name: string) => void;
  selectedPet: string;
};

const NameSection = ({ petsNames, onClick, selectedPet }: Props) => {
  return (
    <View style={styles.petsNameWrap}>
      {petsNames.map(name => (
        <Pressable
          key={`petsName-${name}`}
          onPress={() => onClick(name)}
          style={
            selectedPet !== name
              ? styles.chip
              : [styles.chip, styles.selectedChip]
          }>
          <Text
            style={
              selectedPet !== name
                ? styles.chipText
                : [styles.chipText, styles.selectedChipText]
            }>
            {name}
          </Text>
        </Pressable>
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
  chip: {
    paddingVertical: 13,
    paddingHorizontal: 17,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
  },
  selectedChip: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    borderColor: THEME.COLOR.ORANGE_1,
  },
  chipText: {
    color: THEME.COLOR.BLACK_1,
    fontSize: 14,
  },
  selectedChipText: {
    color: THEME.COLOR.ORANGE_1,
    fontWeight: 'bold',
  },
});
