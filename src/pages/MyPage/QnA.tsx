import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useCallback } from 'react';
import { THEME } from '../../constants/theme';
import QNA from '../../constants/MyPage/Qna';
import QuestionItem from '../../components/myPage/QuestionItem';
import { Question } from '../../model/MyPage.model';

const QnA = () => {
  const renderItems = useCallback(({ item }: { item: Question }) => {
    return <QuestionItem item={item} />;
  }, []);

  return (
    <SafeAreaView
      style={{ height: '100%', backgroundColor: THEME.COLOR.WHITE }}>
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
