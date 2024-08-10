import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getDashBoardPets } from '../../api/pets';
import { RootState } from '../../store/reducer';
import { PetDashBoard } from '../../model/Home.model';
import NameSection from './NameSection';
import PetInfo from './PetInfo';
import NoPets from '../common/NoPets';
import { THEME } from '../../constants/theme';

const PetBox = () => {
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [selectedPet, setSelectedPet] = useState<string>('');
  const token = useSelector((state: RootState) => state.account.token);

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);
      if (data.pets.length > 0) {
        setSelectedPet(data.pets[0].name || '');
      }
    };

    getPetList();
  }, [token]);

  const petsNames = petsList.map(pet => pet.name);
  const filteredPet = petsList.find(pet => pet.name === selectedPet);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>우리 아이</Text>
      {petsList.length < 1 ? (
        <View style={styles.noPetBox}>
          <NoPets />
        </View>
      ) : (
        <>
          <NameSection
            petsNames={petsNames}
            onClick={setSelectedPet}
            selectedPet={selectedPet}
          />
          <PetInfo pet={filteredPet} letterCount={filteredPet?.letterCount} />
        </>
      )}
    </View>
  );
};

export default PetBox;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingTop: 23,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 6,
  },
  noPetBox: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: THEME.COLOR.GRAY_1,
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
});
