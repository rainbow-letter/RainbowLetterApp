import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';

type Props = {
  value: string;
  isSelected: boolean;
  onClick: () => void;
};

const Chip = ({ value, isSelected, onClick }: Props) => {
  return (
    <Pressable
      onPress={onClick}
      style={!isSelected ? styles.chip : [styles.chip, styles.selectedChip]}>
      <Text
        style={
          !isSelected
            ? styles.chipText
            : [styles.chipText, styles.selectedChipText]
        }>
        {value}
      </Text>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
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
