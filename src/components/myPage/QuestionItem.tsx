import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Question } from '../../model/MyPage.model';
import { THEME } from '../../constants/theme';

const QuestionItem = ({ item }: { item: Question }) => {
  return (
    <View key={item.id} style={styles.questionBox}>
      <View style={styles.title}>
        <Text style={[styles.titleText, styles.prefix]}>{item.prefix} </Text>
        <Text style={styles.titleText}>{item.question}</Text>
      </View>
      <View style={styles.answerBox}>
        <Text style={styles.answer}>{item.answer}</Text>
      </View>
    </View>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  questionBox: {
    marginBottom: 30,
  },
  title: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.COLOR.BLACK_1,
  },
  prefix: {
    color: THEME.COLOR.ORANGE_1,
  },
  answerBox: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 21,
    backgroundColor: THEME.COLOR.GRAY_2,
    borderRadius: 15,
  },
  answer: {
    color: '#616161',
    lineHeight: 26,
    fontSize: 16,
  },
});
