import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import { getDashBoardPets } from '../../api/pets';
import WriteLetterTutorial from '../../components/writeLetter/WriteLetterTutorial';
import PetsSection from '../../components/writeLetter/PetsSection';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';

const WriteLetter = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.account.token);
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);

      const action = PetSelectSlice.actions.setPetInfo(data.pets[0]);
      dispatch(action);
    };

    getPetList();
  }, [token, dispatch]);

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
        <PetsSection petsList={petsList} />
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
