import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Button from './Button';
import { THEME } from '../../constants/theme';

const NoPets = () => {
  return (
    <View>
      <Text style={styles.title}>앗, 편지를 받을 아이가 없어요</Text>
      <Text style={styles.contents}>우리 아이를 등록하러 가볼까요?</Text>
      <Button onPress={() => Alert.alert('구현중')} isCheck>
        등록하기
      </Button>
    </View>
  );
};

export default NoPets;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
    textAlign: 'center',
    marginBottom: 12,
  },
  contents: {
    textAlign: 'center',
    marginBottom: 26,
  },
});
