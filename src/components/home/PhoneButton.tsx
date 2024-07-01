import { StyleSheet, Text, Pressable, Linking } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import Phone from '../../assets/ic_home_phone.svg';

const PhoneButton = () => {
  const onClickPhoneButtonClick = () => {
    Linking.openURL('tel:109');
  };

  return (
    <Pressable style={styles.section} onPress={onClickPhoneButtonClick}>
      <Phone />
      <Text style={styles.kakaoText}>자살예방 상담전화 109</Text>
    </Pressable>
  );
};

export default PhoneButton;

const styles = StyleSheet.create({
  section: {
    marginTop: 11,
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
  },
});
