import { StyleSheet, Text, Linking, Pressable } from 'react-native';
import React from 'react';

import Kakao from '../../assets/ic_home_kakao.svg';
import { THEME } from '../../constants/theme';

const KakaoContact = () => {
  const onClickKaKaoContactButtonClick = () => {
    Linking.openURL('https://pf.kakao.com/_MNevG');
  };

  return (
    <Pressable style={styles.section} onPress={onClickKaKaoContactButtonClick}>
      <Kakao />
      <Text style={styles.kakaoText}>오류 시 오픈카카오톡 문의하기</Text>
    </Pressable>
  );
};

export default KakaoContact;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    backgroundColor: THEME.COLOR.ORANGE_3,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    gap: 10,
  },
  kakaoText: {
    color: THEME.COLOR.ORANGE_1,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});
