import { StyleSheet, View } from 'react-native';
import React from 'react';

import NoPetsBox from './NoPetsBox';
import SelectPetsBox from './SelectPetsBox';
import { PetDashBoard } from '../../model/Home.model';

type Props = {
  petsList: PetDashBoard[];
  setSelectedPet: (pet: PetDashBoard) => void;
  selectedPet: PetDashBoard | undefined;
};

const PetsSection = ({ petsList, setSelectedPet, selectedPet }: Props) => {
  const registerdPets = petsList.length > 0;

  return (
    <View style={styles.section}>
      {registerdPets ? (
        <SelectPetsBox
          setSelectedPet={setSelectedPet}
          selectedPet={selectedPet}
          petList={petsList}
        />
      ) : (
        <NoPetsBox />
      )}
    </View>
  );
};

export default PetsSection;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    marginTop: 10,
    zIndex: 10,
  },
});
