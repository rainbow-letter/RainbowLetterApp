import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Pets } from '../../model/Pet.model';
import Arrow from '../../assets/ic_letterBox_arrow.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { THEME } from '../../constants/theme';

type Props = {
  petsList: Pets[];
};

const PetToggle = ({ petsList }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const { name } = useSelector((state: RootState) => state.petSelect);

  const handlePetsListShow = useCallback(() => {
    setIsShow(prev => !prev);
  }, []);

  console.log(isShow, petsList);

  return (
    <>
      <View style={styles.toggleSection}>
        <Pressable onPress={handlePetsListShow} style={styles.toggleButton}>
          <Text style={styles.name}>{name}</Text>
          <Arrow />
        </Pressable>
      </View>
    </>
  );
};

export default PetToggle;

const styles = StyleSheet.create({
  toggleSection: {
    position: 'relative',
    zIndex: 10,
  },
  toggleButton: {
    position: 'absolute',
    left: 20,
    top: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    color: THEME.COLOR.BLACK_1,
  },
});
