import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useCallback } from 'react';
import { theme } from '../../constants/theme';
import QNA from '../../constants/qna';
import QuestionItem from '../../components/QuestionItem';
import Question from '../../model/question.model';

const QnA = () => {
  const renderItems = useCallback(({ item }: { item: Question }) => {
    return <QuestionItem item={item} />;
  }, []);

  return (
    <SafeAreaView
      style={{ height: '100%', backgroundColor: theme.color.white }}>
      <FlatList
        data={QNA}
        renderItem={renderItems}
        keyExtractor={item => item.question}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default QnA;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    marginTop: 30,
  },
});
