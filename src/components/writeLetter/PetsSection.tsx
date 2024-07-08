import { StyleSheet, View } from 'react-native';
import React from 'react';

import NoPetsBox from './NoPetsBox';
import SelectPetsBox from './SelectPetsBox';
import { PetDashBoard } from '../../model/Home.model';

type Props = {
  petsList: PetDashBoard[];
};

const PetsSection = ({ petsList }: Props) => {
  const registerdPets = petsList.length > 0;

  return (
    <View style={styles.section}>
      {registerdPets ? <SelectPetsBox petList={petsList} /> : <NoPetsBox />}
    </View>
  );
};

export default PetsSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    zIndex: 10,
  },
});
