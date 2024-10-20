import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import React from 'react';

import { isCheckUnread } from '../../utils/letter';
import Stamp from '../../assets/ic_letterBox_letterStamp.png';
import { THEME } from '../../constants/theme';
import LetterStatus from './LetterStatus';

type Props = {
  letter: any;
  handleLetterCheck: (id: number) => void;
  isSelect: boolean;
};

const LetterItemForDelete = ({
  letter: { readStatus, status, summary, number, id },
  handleLetterCheck,
  isSelect,
}: Props) => {
  return (
    <Pressable
      onPress={() => handleLetterCheck(id)}
      style={
        isSelect
          ? [styles.letter, styles.select]
          : isCheckUnread(readStatus, status)
          ? styles.letter
          : [styles.letter]
      }>
      <View>
        <LetterStatus status={status} readStatus={readStatus} />
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.index}>{number}번째 편지</Text>
      </View>
      <View>
        <Image source={Stamp} />
      </View>
    </Pressable>
  );
};

export default LetterItemForDelete;

const styles = StyleSheet.create({
  letter: {
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: THEME.COLOR.GRAY_2,
    borderRadius: 12,
  },
  unReadLetter: {
    backgroundColor: THEME.COLOR.YELLOW_1,
  },
  summary: {
    marginTop: 12,
    color: THEME.COLOR.BLACK_2,
  },
  index: {
    fontSize: 12,
    color: THEME.COLOR.GRAY_4,
    marginTop: 24,
  },
  select: {
    backgroundColor: 'rgba(255, 0, 0, 0.25)',
  },
});
