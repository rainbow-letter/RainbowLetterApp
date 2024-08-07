import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useRef, useMemo, useCallback } from 'react';
import { format, subMonths } from 'date-fns';
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

  const onClickNextMonth = useCallback(() => {
    setCurrentDate(subMonths(currentDate, -1));
    setDate(subMonths(currentDate, -1));
  }, [currentDate, setCurrentDate, setDate]);

  const onClickPrevMonth = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
    setDate(subMonths(currentDate, 1));
  }, [currentDate, setCurrentDate, setDate]);

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
    },
    [setCurrentDate, setDate],
  );

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    // onClose();
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return (
    <View style={styles.section}>
      <Pressable onPress={onClose} style={styles.header}>
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
                      isToday(day)
                        ? [styles.day, styles.today]
                        : !isExistWrittenLetter(day)
                        ? styles.unExistDay
                        : [styles.day, styles.existDay]
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
          <Text>sssss</Text>
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
    height: 12,
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
  },
  confirmButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    color: THEME.COLOR.WHITE,
  },
});
