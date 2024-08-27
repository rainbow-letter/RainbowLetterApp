import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays, subDays } from 'date-fns';

import MonthCalendar from './MonthCalendar';
import useCalendar from '../../hooks/useCalendar';
import { THEME } from '../../constants/theme';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import Stamp from '../../assets/ic_letterBox_stamp.svg';

const DAY_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

type Props = {
  setDate: (date: Date) => void;
  letterList: string[];
  onClickMonthCalendarButton: () => void;
  showMonthCalendar: boolean;
};

const WeekCalendar = ({
  setDate,
  letterList,
  onClickMonthCalendarButton,
  showMonthCalendar,
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

  useEffect(() => {
    const findIndex = weekCalendarList.findIndex((weeks: string[]) =>
      weeks.includes(format(currentDate, 'yyyy-MM-dd')),
    );

    setWeekCalendar(weekCalendarListForWeeks[findIndex]);
  }, [currentDate]);

  const onClickNextWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, 7));
    setDate(addDays(currentDate, 7));
  }, [currentDate, setCurrentDate, setDate]);

  const onClickPrevWeek = useCallback(() => {
    setCurrentDate(subDays(currentDate, 7));
    setDate(subDays(currentDate, 7));
  }, [currentDate, setCurrentDate, setDate]);

  const onClickDateButton = useCallback(
    (date: number) => {
      setCurrentDate(new Date(date));
      setDate(new Date(date));
    },
    [setCurrentDate, setDate],
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
            <Text>이전 주</Text>
          </Pressable>
          <Pressable
            onPress={onClickMonthCalendarButton}
            style={styles.weekTitleButton}>
            <Text style={styles.weekTitle}>{yearAndMonth}</Text>
            <DropDown />
          </Pressable>
          <Pressable onPress={onClickNextWeek} style={styles.weekButton}>
            <Text>다음 주</Text>
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
                  isToday(date)
                    ? [styles.dateButton, styles.todayButton]
                    : !isExistWrittenLetter(date)
                    ? styles.dateButton
                    : [styles.dateButton, styles.writtenButton]
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
    color: THEME.COLOR.GRAY_6,
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
