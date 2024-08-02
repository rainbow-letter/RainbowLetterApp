import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { letterReplyStatus, isCheckUnread } from '../../utils/letter';
import Letter from '../../assets/ic_letterBox_letter.svg';
import GrayCheck from '../../assets/ic_letterBox_gray-check.svg';
import Check from '../../assets/ic_letterBox_check.svg';
import { THEME } from '../../constants/theme';

type Props = {
  status: 'RESPONSE' | 'REQUEST';
  readStatus: string;
};

const LetterStatus = ({ status, readStatus }: Props) => {
  const letterStatus = letterReplyStatus(status);
  const isCompleteResponse = status === 'RESPONSE';
  const Icon = isCheckUnread(readStatus, status) ? <Check /> : <GrayCheck />;

  return (
    <View
      style={
        !isCompleteResponse
          ? styles.box
          : isCheckUnread(readStatus, status)
          ? [styles.box, styles.completedBg]
          : [styles.box, styles.unCompletedBg]
      }>
      {isCompleteResponse ? Icon : <Letter />}
      <Text
        style={
          !isCompleteResponse
            ? styles.statusText
            : isCheckUnread(readStatus, status)
            ? [styles.statusText, styles.completedText]
            : [styles.statusText, styles.unCompletedText]
        }>
        {letterStatus}
      </Text>
    </View>
  );
};

export default LetterStatus;

const styles = StyleSheet.create({
  box: {
    maxWidth: 80,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 15,
    paddingVertical: 4,
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.COLOR.RED_1,
  },
  completedText: {
    color: THEME.COLOR.GREEN_2,
  },
  unCompletedText: {
    color: THEME.COLOR.GRAY_3,
  },
  completedBg: {
    backgroundColor: THEME.COLOR.GREEN_1,
  },
  unCompletedBg: {
    backgroundColor: THEME.COLOR.GRAY_3,
  },
});
