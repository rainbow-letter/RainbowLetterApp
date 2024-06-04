import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { THEME } from '../../constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';

const AccountBox = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.accountSection}>
      <View style={styles.accountBox}>
        <Text style={styles.loginTitle}>앗, 로그인 하셔야 해요</Text>
        <Text style={styles.loginDescription}>
          무료로 가입하고 편지를 써보세요!
        </Text>
        <View style={styles.buttonWrap}>
          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>로그인하기</Text>
          </Pressable>
          <Pressable
            style={styles.signUpButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpButtonText}>가입하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AccountBox;

const styles = StyleSheet.create({
  accountSection: {
    paddingHorizontal: 18,
    top: -16,
    backgroundColor: THEME.COLOR.WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  accountBox: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_3,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 28,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: THEME.COLOR.BLACK_1,
  },
  loginDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    color: THEME.COLOR.BLACK_1,
  },
  buttonWrap: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 16,
  },
  loginButton: {
    backgroundColor: THEME.COLOR.ORANGE_1,
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 20,
    flex: 1,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.WHITE,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: THEME.COLOR.ORANGE_1,
    paddingHorizontal: 22,
    paddingVertical: 20,
    flex: 1,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.ORANGE_1,
    textAlign: 'center',
  },
});
