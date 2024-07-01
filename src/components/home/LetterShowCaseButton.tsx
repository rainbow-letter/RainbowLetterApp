import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';

import Logo from '../../assets/ic_home_logo.svg';
import { THEME } from '../../constants/theme';

const LetterShowCaseButton = () => {
  const onClickLetterUpdateButton = () => {
    Alert.alert('아직 구현중!');
  };

  return (
    <View style={styles.section}>
      <Shadow distance={1} startColor="rgba(0, 0, 0, 0.15)">
        <Pressable style={styles.button} onPress={onClickLetterUpdateButton}>
          <Logo />
          <Text style={styles.buttonText}>내 편지도 걸어보기</Text>
        </Pressable>
      </Shadow>
    </View>
  );
};

export default LetterShowCaseButton;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 15,
  },
  buttonText: {
    color: THEME.COLOR.BLACK_1,
  },
});
