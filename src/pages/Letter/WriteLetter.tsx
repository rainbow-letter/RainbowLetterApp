import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import { getDashBoardPets } from '../../api/pets';
import WriteLetterTutorial from '../../components/writeLetter/WriteLetterTutorial';
import PetsSection from '../../components/writeLetter/PetsSection';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';

const WriteLetter = () => {
  const token = useSelector((state: RootState) => state.account.token);
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetDashBoard>();
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);
      setSelectedPet(data.pets[0]);
    };

    getPetList();
  }, [token]);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <WriteLetterTutorial
          visible={showTutorial}
          onClose={handleCloseTutorial}
        />
        <PetsSection
          petsList={petsList}
          setSelectedPet={setSelectedPet}
          selectedPet={selectedPet}
        />
        <Text>Your Write Letter Page Content Here</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
    paddingHorizontal: 18,
  },
});

export default WriteLetter;
