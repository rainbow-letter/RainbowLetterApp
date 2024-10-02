import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { addDays, lastDayOfMonth, format } from 'date-fns';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import { THEME } from '../../constants/theme';
import Cancel from '../../assets/ic_letterBox_X.svg';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import Stamp from '../../assets/ic_letterBox_stamp.svg';
import Up from '../../assets/ic_letterBox_up.svg';
import Down from '../../assets/ic_letterBox_down.svg';

type Props = {
  yearAndMonth: string;
  onClose: () => void;
  weekCalendarList: any;
  letterList: string[];
  currentDate: Date;
  setCurrentDate: any;
  setDate: (date: Date) => void;
};

const MonthCalendar = ({
  yearAndMonth,
  onClose,
  weekCalendarList,
  letterList,
  currentDate,
  setCurrentDate,
  setDate,
}: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const SAVE_DATE = currentDate;

  const onClickNextMonth = useCallback(() => {
    const lastDay = lastDayOfMonth(currentDate);
    setCurrentDate(addDays(lastDay, 1));
  }, [setCurrentDate, currentDate]);

  const onClickPrevMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }, [setCurrentDate, currentDate]);

  const isExistWrittenLetter = useCallback(
    (date: string) => {
      return letterList.includes(date);
    },
    [letterList],
  );

  const isToday = useCallback((date: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === date;
  }, []);

  const isActiveDate = useCallback(
    (date: string) => {
      return format(currentDate, 'yyyy-MM-dd') === date;
    },
    [currentDate],
  );

  const onClickDateButton = useCallback(
    (date: string) => {
      setDate(new Date(date));
      setCurrentDate(new Date(date));
      onClose();
    },
    [setCurrentDate, setDate, onClose],
  );

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const handleUpYear = useCallback(() => {
    setYear((prev: number) => prev + 1);
  }, []);

  const handleDownYear = useCallback(() => {
    if (year <= 0) {
      return;
    }
    setYear((prev: number) => prev - 1);
  }, [year]);

  const handleUpMonth = useCallback(() => {
    if (month >= 11) {
      return;
    }
    setMonth((prev: number) => prev + 1);
  }, [month]);

  const handleDownMonth = useCallback(() => {
    if (month <= 0) {
      return;
    }
    setMonth((prev: number) => prev - 1);
  }, [month]);

  const onClickConfirmButton = useCallback(() => {
    setCurrentDate(new Date(year, month, currentDate.getDate()));
    setDate(new Date(year, month, currentDate.getDate()));
    bottomSheetModalRef.current?.close();
  }, [year, month, currentDate, setCurrentDate, setDate]);

  const onClickCancelButton = useCallback(() => {
    onClose();
    setCurrentDate(SAVE_DATE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, setCurrentDate]);

  return (
    <View style={styles.section}>
      <Pressable onPress={onClickCancelButton} style={styles.header}>
        <Cancel />
      </Pressable>
      <View>
        <View style={styles.monthTitleWrap}>
          <Pressable onPress={onClickPrevMonth} style={styles.monthButton}>
            <Left />
            <Text>이전 달</Text>
          </Pressable>
          <Pressable
            onPress={handlePresentModalPress}
            style={styles.monthTitleButton}>
            <Text style={styles.monthTitle}>{yearAndMonth}</Text>
            <DropDown />
          </Pressable>
          <Pressable onPress={onClickNextMonth} style={styles.monthButton}>
            <Text>다음 달</Text>
            <Right />
          </Pressable>
        </View>
      </View>
      <View style={styles.calendar}>
        {weekCalendarList.map((week: string[]) => (
          <View style={styles.weekWrap}>
            {week.map((day: string) =>
              day === '0' ? (
                <View style={styles.bottom}>
                  <Pressable style={styles.emptyDay}>
                    <Text>{day === '0'}</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.bottom}>
                  <Pressable
                    onPress={() => onClickDateButton(day)}
                    style={
                      isExistWrittenLetter(day)
                        ? [styles.day, styles.existDay]
                        : !isToday(day)
                        ? styles.unExistDay
                        : [styles.day, styles.today]
                    }>
                    {isExistWrittenLetter(day) && <Stamp />}
                  </Pressable>
                  <View
                    style={
                      !isActiveDate(day)
                        ? styles.dateTextBox
                        : [styles.dateTextBox, styles.activeDate]
                    }>
                    <Text
                      style={
                        !isActiveDate(day)
                          ? styles.dateText
                          : [styles.dateText, styles.activeDateText]
                      }>
                      {format(day, 'dd')}
                    </Text>
                  </View>
                </View>
              ),
            )}
          </View>
        ))}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.controller}>
            <View style={styles.yearWrap}>
              <Pressable hitSlop={15} onPress={handleUpYear}>
                <Up />
              </Pressable>
              <Text style={styles.yearMonthText}>{year}</Text>
              <Pressable hitSlop={15} onPress={handleDownYear}>
                <Down />
              </Pressable>
            </View>
            <Text>년</Text>
            <View style={styles.monthWrap}>
              <Pressable hitSlop={15} onPress={handleUpMonth}>
                <Up />
              </Pressable>
              <Text style={styles.yearMonthText}>{month + 1}</Text>
              <Pressable hitSlop={15} onPress={handleDownMonth}>
                <Down />
              </Pressable>
            </View>
            <Text>월</Text>
          </View>
          <Pressable
            onPress={onClickConfirmButton}
            style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>확인</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default MonthCalendar;

const styles = StyleSheet.create({
  section: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: THEME.COLOR.GRAY_8,
  },
  header: {
    position: 'absolute',
    top: 30,
    right: 18,
    zIndex: 10,
  },
  monthTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 66,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  monthButtonText: {
    color: THEME.COLOR.GRAY_6,
  },
  monthTitleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_2,
  },
  calendar: {
    marginTop: 30,
  },
  bottom: {
    marginBottom: 14,
  },
  emptyDay: {
    marginBottom: 4,
    width: 42,
    height: 42,
  },
  weekWrap: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  day: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginBottom: 4,
  },
  unExistDay: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: THEME.COLOR.GRAY_2,
  },
  existDay: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    backgroundColor: THEME.COLOR.ORANGE_1,
  },
  unToday: {
    backgroundColor: THEME.COLOR.GRAY_2,
  },
  dateTextBox: {
    marginTop: 6,
    width: 30,
    height: 14,
    marginHorizontal: 'auto',
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
  bottomSheetContent: {
    zIndex: 50,
    paddingTop: 70,
    marginHorizontal: 'auto',
    flexDirection: 'column',
  },
  confirmButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 'auto',
    marginTop: 40,
    backgroundColor: THEME.COLOR.ORANGE_1,
    borderRadius: 22,
  },
  confirmButtonText: {
    fontSize: 16,
    color: THEME.COLOR.WHITE,
  },
  controller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearWrap: {
    alignItems: 'center',
    gap: 12,
    marginRight: 20,
  },
  monthWrap: {
    alignItems: 'center',
    gap: 12,
    marginRight: 20,
    marginLeft: 30,
  },
  yearMonthText: {
    fontSize: 30,
  },
});
