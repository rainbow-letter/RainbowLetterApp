import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format, getDay } from 'date-fns';

import ThickDivider from '../home/ThickDivider';
import { Letters } from '../../model/Letter.model';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { RootBottomTabParamList } from '../bottomTab/BottomTabScreen';
import { formatDay } from '../../utils/date';
import Plus from '../../assets/ic_letterBox_plus.svg';
import { THEME } from '../../constants/theme';

type Props = {
  date: Date;
  letterList: Letters[];
};

const LetterListSection = ({ date, letterList }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const pet = useSelector((state: RootState) => state.petSelect);
  const [filteredLetterListByPet, setFilteredLetterLisByPet] = useState<
    Letters[]
  >([]);

  useEffect(() => {
    const filteredListByPet = letterList.filter(
      letter => letter.petName === pet.name,
    );
    filteredListByPet.reverse().forEach((letter: Letters, index: number) => {
      const temp = letter;
      temp.index = index + 1;

      return temp;
    });

    setFilteredLetterLisByPet(filteredListByPet.reverse() || []);
  }, [pet, letterList]);

  const filteredListByDate = filteredLetterListByPet.filter(
    letter =>
      format(letter.createdAt, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  );

  const formattedDay = formatDay(getDay(date));
  const dateAndDay = `${format(date, 'M월 dd일')} ${formattedDay}요일`;

  const isToday = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === format(date, 'yyyy-MM-dd');
  }, [date]);

  const onClickWriteLetterButton = useCallback(() => {
    navigation.navigate('WriteLetter');
  }, [navigation]);

  const renderItems = useCallback(
    ({ item }: any) => {
      return (
        <Pressable onPress={onClickWriteLetterButton} style={styles.letter}>
          <Text>{item.summary}</Text>
        </Pressable>
      );
    },
    [onClickWriteLetterButton],
  );

  return (
    <>
      <ThickDivider />
      <View style={styles.section}>
        <Text style={styles.today}>{dateAndDay}</Text>
        <FlatList
          data={filteredListByDate}
          renderItem={renderItems}
          keyExtractor={item => item.summary}
          style={styles.letterList}
        />
        {isToday && (
          <Pressable style={styles.addButton}>
            <Plus />
            <Text style={styles.addButtonText}>편지 쓰기</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default LetterListSection;

const styles = StyleSheet.create({
  section: {
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 68,
  },
  today: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  letterList: {
    marginTop: 20,
  },
  letter: {
    padding: 18,
    borderWidth: 1,
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    borderRadius: 16,
  },
  addButtonText: {
    color: THEME.COLOR.ORANGE_1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
