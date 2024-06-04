import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../constants/theme';
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
    position: 'absolute',
    top: -16,
    backgroundColor: theme.color.white,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  accountBox: {
    borderWidth: 1,
    borderColor: theme.color.GRAY_3,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 28,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  buttonWrap: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 16,
  },
  loginButton: {
    backgroundColor: theme.color.orange,
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 20,
    flex: 1,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color.white,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: theme.color.white,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.color.orange,
    paddingHorizontal: 22,
    paddingVertical: 20,
    flex: 1,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color.orange,
    textAlign: 'center',
  },
});
