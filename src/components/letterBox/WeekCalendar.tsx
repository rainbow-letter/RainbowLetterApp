import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

import MonthCalendar from './MonthCalendar';
import useCalendar from '../../hooks/useCalendar';
import { THEME } from '../../constants/theme';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import Stamp from '../../assets/ic_letterBox_stamp.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { getLetterList } from '../../api/letter';

const DAY_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

type Props = {
  setDate: (date: Date) => void;
  letterList: string[];
  setLetterList: (letter: any) => void;
  onClickMonthCalendarButton: () => void;
  showMonthCalendar: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const WeekCalendar = ({
  setDate,
  letterList,
  setLetterList,
  onClickMonthCalendarButton,
  showMonthCalendar,
  setIsEditing,
}: Props) => {
  const {
    currentDate,
    setCurrentDate,
    weekCalendarListForWeeks,
    weekCalendarList,
  } = useCalendar();

  const yearAndMonth = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;
  const [weekCalendar, setWeekCalendar] = useState<number[]>([]);
  const { token } = useSelector((state: RootState) => state.account);
  const pet = useSelector((state: RootState) => state.petSelect);

  useFocusEffect(
    useCallback(() => {
      setCurrentDate(new Date());
      setDate(new Date());
    }, [setCurrentDate, setDate]),
  );

  useEffect(() => {
    (async () => {
      if (pet?.id === undefined || weekCalendar.length <= 0) return;

      const {
        data: { letters },
      } = await getLetterList(token, pet?.id);

      setLetterList(letters || []);
    })();
  }, [pet, weekCalendar, token, setLetterList]);

  useEffect(() => {
    const findIndex = weekCalendarList.findIndex((weeks: string[]) =>
      weeks.includes(format(currentDate, 'yyyy-MM-dd')),
    );

    setWeekCalendar(weekCalendarListForWeeks[findIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const onClickNextWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, 7));
    setDate(addDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate, setCurrentDate, setDate, setIsEditing]);

  const onClickPrevWeek = useCallback(() => {
    setCurrentDate(subDays(currentDate, 7));
    setDate(subDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate, setCurrentDate, setDate, setIsEditing]);

  const onClickDateButton = useCallback(
    (date: number) => {
      setCurrentDate(new Date(date));
      setDate(new Date(date));
      setIsEditing(false);
    },
    [setCurrentDate, setDate, setIsEditing],
  );

  const isActiveDate = useCallback(
    (date: number) => {
      return format(currentDate, 'yyyy-MM-dd') === String(date);
    },
    [currentDate],
  );

  const isExistWrittenLetter = useCallback(
    (date: number) => {
      return letterList.includes(String(date));
    },
    [letterList],
  );

  const isToday = useCallback((date: number) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === String(date);
  }, []);

  return (
    <>
      <View style={styles.weekCalendarWrap}>
        <View style={styles.weekTitleWrap}>
          <Pressable onPress={onClickPrevWeek} style={styles.weekButton}>
            <Left />
            <Text style={styles.weekButtonText}>이전 주</Text>
          </Pressable>
          <Pressable
            onPress={onClickMonthCalendarButton}
            style={styles.weekTitleButton}>
            <Text style={styles.weekTitle}>{yearAndMonth}</Text>
            <DropDown />
          </Pressable>
          <Pressable onPress={onClickNextWeek} style={styles.weekButton}>
            <Text style={styles.weekButtonText}>다음 주</Text>
            <Right />
          </Pressable>
        </View>
        <View style={styles.dayWrap}>
          {DAY_OF_THE_WEEK.map(day => (
            <Text key={`weekCalendar-${day}`} style={styles.dayText}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.dateWrap}>
          {weekCalendar.map(date => (
            <View style={styles.date}>
              <Pressable
                onPress={() => onClickDateButton(date)}
                style={
                  isExistWrittenLetter(date)
                    ? [styles.dateButton, styles.writtenButton]
                    : !isToday(date)
                    ? styles.dateButton
                    : [styles.dateButton, styles.todayButton]
                }>
                {isExistWrittenLetter(date) && <Stamp />}
              </Pressable>
              <View
                style={
                  !isActiveDate(date)
                    ? styles.dateTextBox
                    : [styles.dateTextBox, styles.activeDate]
                }>
                <Text
                  style={
                    !isActiveDate(date)
                      ? styles.dateText
                      : [styles.dateText, styles.activeDateText]
                  }>
                  {format(date, 'dd')}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {showMonthCalendar && (
        <MonthCalendar
          yearAndMonth={yearAndMonth}
          currentDate={currentDate}
          onClose={onClickMonthCalendarButton}
          weekCalendarList={weekCalendarList}
          letterList={letterList}
          setCurrentDate={setCurrentDate}
          setDate={setDate}
        />
      )}
    </>
  );
};

export default WeekCalendar;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
  },
  weekCalendarWrap: {
    paddingVertical: 32,
    paddingHorizontal: 18,
  },
  weekTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weekButtonText: {
    lineHeight: 17,
    color: THEME.COLOR.BLACK_1,
  },
  weekTitleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_2,
  },
  dayWrap: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  dayText: {
    fontSize: 12,
    color: THEME.COLOR.GRAY_7,
  },
  dateWrap: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-around',
  },
  date: {
    alignItems: 'center',
  },
  dateButton: {
    width: 44,
    height: 50,
    borderRadius: 8,
    backgroundColor: THEME.COLOR.GRAY_2,
    justifyContent: 'center',
  },
  writtenButton: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    alignItems: 'center',
  },
  todayButton: {
    backgroundColor: THEME.COLOR.ORANGE_1,
  },
  dateTextBox: {
    marginTop: 6,
    width: 30,
    height: 14,
  },
  dateText: {
    fontSize: 12,
    color: THEME.COLOR.GRAY_7,
    textAlign: 'center',
    lineHeight: 14,
  },
  activeDate: {
    backgroundColor: THEME.COLOR.ORANGE_1,
    color: THEME.COLOR.WHITE,
    borderRadius: 10,
    borderColor: THEME.COLOR.ORANGE_1,
  },
  activeDateText: {
    color: THEME.COLOR.WHITE,
  },
});
