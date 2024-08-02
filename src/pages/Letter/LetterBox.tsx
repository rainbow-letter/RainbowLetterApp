import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import NoPets from '../../components/common/NoPets';
import PetInfoCard from '../../components/letterBox/PetInfoCard';
import WeekCalendar from '../../components/letterBox/WeekCalendar';
import LetterListSection from '../../components/letterBox/LetterListSection';
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
  const [date, setDate] = useState(new Date());

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

  const mappedLetterListByDate = letterList.map(letter =>
    format(letter.createdAt, 'yyyy-MM-dd'),
  );

  if (petsList !== null && petsList.length < 1) {
    return <NoPets />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <PetInfoCard petsList={petsList} />
        <WeekCalendar
          selectedDate={date}
          setDate={setDate}
          letterList={mappedLetterListByDate}
        />
        <LetterListSection date={date} letterList={letterList} />
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
