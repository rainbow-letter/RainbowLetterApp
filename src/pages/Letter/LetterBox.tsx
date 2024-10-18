import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

import NoPets from '../../components/common/NoPets';
import PetInfoCard from '../../components/letterBox/PetInfoCard';
import WeekCalendar from '../../components/letterBox/WeekCalendar';
import LetterListSection from '../../components/letterBox/LetterListSection';
import Spinner from '../../components/common/Spinner';
import { RootState } from '../../store/reducer';
import { Letters } from '../../model/Letter.model';
import { PetsList } from '../../model/Pet.model';
import { getPetList } from '../../api/pets';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';

const LetterBox = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.account);
  const calendarRef = useRef<any>(null);

  const [letterList, setLetterList] = useState<Letters[]>([]);
  const [petsList, setPetsList] = useState<PetsList[]>([]);
  const [date, setDate] = useState(new Date());
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (calendarRef.current) {
        calendarRef.current?.scrollTo({
          y: 0,
        });
      }
      setIsEditing(false);

      (async () => {
        setIsFetchLoading(true);
        const {
          data: { pets },
        } = await getPetList(token);
        setPetsList(pets || []);

        const action = PetSelectSlice.actions.setPetInfo(pets[0]);
        dispatch(action);
        setIsFetchLoading(false);
      })();
    }, [token, dispatch]),
  );

  const onClickMonthCalendarButton = useCallback(() => {
    setShowMonthCalendar(prev => !prev);
    setIsEditing(false);
    calendarRef.current?.scrollTo({
      y: 0,
    });
  }, [calendarRef]);

  const mappedLetterListByDate = letterList.map(letter =>
    format(letter.createdAt, 'yyyy-MM-dd'),
  );

  if (isFetchLoading) {
    return (
      <View style={styles.spinnerCon}>
        <Text>
          <Spinner size="large" color={THEME.COLOR.ORANGE_1} />
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {petsList !== null && petsList.length < 1 ? (
        <NoPets />
      ) : (
        <ScrollView ref={calendarRef}>
          <PetInfoCard petsList={petsList} />
          <WeekCalendar
            setDate={setDate}
            letterList={mappedLetterListByDate}
            setLetterList={setLetterList}
            onClickMonthCalendarButton={onClickMonthCalendarButton}
            showMonthCalendar={showMonthCalendar}
            setIsEditing={setIsEditing}
          />
          <LetterListSection
            date={date}
            letterList={letterList}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setLetterList={setLetterList}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LetterBox;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
    position: 'relative',
  },
  spinnerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLOR.WHITE,
  },
});
