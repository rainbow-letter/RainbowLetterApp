import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

import { THEME } from '../../constants/theme';

type Props = {
  content: string | undefined;
  pet: string | undefined;
  timeStamp: Date | string | undefined;
  type: 'LETTER' | 'REPLY';
};

const LetterPaper = ({ content, pet, timeStamp, type }: Props) => {
  const isLetter = type === 'LETTER';

  return (
    <View style={!isLetter ? styles.letterSection : styles.replaySection}>
      <View style={!isLetter ? styles.pad : [styles.pad, styles.replyPad]}>
        <Text style={styles.petNameText}>{pet}에게</Text>
        <TextInput
          style={!isLetter ? styles.padText : [styles.padText, styles.replyPad]}
          multiline
          value={content}
          textAlignVertical="top"
          readOnly
        />
        <Text style={styles.timeStamp}>
          {timeStamp && format(timeStamp, 'yyyy년 MM월 dd일')}
        </Text>
      </View>
    </View>
  );
};

export default LetterPaper;

const styles = StyleSheet.create({
  letterSection: {
    width: '100%',
    paddingTop: 242,
  },
  replaySection: {
    width: '100%',
    marginTop: 16,
  },
  pad: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    paddingVertical: 42,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  replyPad: {
    backgroundColor: THEME.COLOR.GRAY_2,
  },
  petNameText: {
    fontSize: 20,
    fontFamily: 'KyoboHandwriting2019',
  },
  padText: {
    backgroundColor: THEME.COLOR.ORANGE_3,
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'KyoboHandwriting2019',
    minHeight: 344,
    lineHeight: 40,
  },
  timeStamp: {
    color: THEME.COLOR.GRAY_4,
    fontSize: 14,
    fontFamily: 'KyoboHandwriting2019',
    textAlign: 'right',
  },
});
