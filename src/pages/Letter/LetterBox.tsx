import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NoPets from '../../components/common/NoPets';
import PetInfoCard from '../../components/letterBox/PetInfoCard';
import { getLetterList } from '../../api/letter';
import { RootState } from '../../store/reducer';
import { Letters } from '../../model/Letter.model';
import { Pets } from '../../model/Pet.model';
import { getPetList } from '../../api/pets';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';

const LetterBox = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.account);

  const [letterList, setLetterList] = useState<Letters[]>([]);
  const [petsList, setPetsList] = useState<Pets[]>([]);

  // console.log(letterList);

  useEffect(() => {
    (async () => {
      const {
        data: { letters },
      } = await getLetterList(token);
      const {
        data: { pets },
      } = await getPetList(token);

      setLetterList(letters || []);
      setPetsList(pets || []);

      const action = PetSelectSlice.actions.setPetInfo(pets[0]);
      dispatch(action);
    })();
  }, [token, dispatch]);

  if (petsList !== null && petsList.length < 1) {
    return <NoPets />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <PetInfoCard petsList={petsList} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LetterBox;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
  },
});
