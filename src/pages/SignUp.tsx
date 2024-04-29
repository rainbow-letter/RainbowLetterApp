import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useCallback, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import axios from 'axios';

import { RootStackParamList } from '../../Appinner';
import naver from '../assets/login_naver_icon.png';
import google from '../assets/login_google_icon.png';
import { theme } from '../constants/theme';
import { validateEmail, validatePassword } from '../utils/validate';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  });

  const onChangeEmail = useCallback(
    (value: string) => {
      setProfile({ ...profile, email: value });
    },
    [profile],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      setProfile({ ...profile, password: value });
    },
    [profile],
  );

  const onClickSignUpButton = useCallback(async () => {
    try {
      const { email, password } = profile;
      if (!validateEmail(email)) {
        return new Error('이메일이 다릅니다.');
      }
      if (!validatePassword(password)) {
        return new Error('비밀번호가 다릅니다.');
      }
      await axios.post('http://localhost:3015/api/members', profile);
    } catch (error) {
      console.log(error);
    }
  }, [profile]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>무료로 편지를 써보세요!</Text>
          <Text style={styles.subTitle}>SNS로 간편 가입하기</Text>
          <View style={styles.iconBox}>
            <Pressable>
              <Image source={google} style={styles.icon} />
            </Pressable>
            <Pressable>
              <Image source={naver} style={styles.icon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.divideBox}>
          <View style={styles.divide} />
          <Text style={styles.divideText}>또는 이메일로 가입하기</Text>
          <View style={styles.divide} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="이메일을 입력해주세요"
            style={styles.input}
            onChangeText={onChangeEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            ref={emailRef}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            style={styles.input}
            secureTextEntry
            onChangeText={onChangePassword}
            ref={passwordRef}
          />
        </View>
        <View style={styles.agreeContainer}>
          <View style={[styles.AgreeBox, styles.allAgreeBox]}>
            <Pressable style={styles.agreeButton}>
              <View style={styles.checkBox} />
              <Text style={[styles.checkBoxText, styles.allAgreeText]}>
                전체 동의
              </Text>
            </Pressable>
          </View>
          <View>
            <View style={styles.AgreeBox}>
              <Pressable style={styles.agreeButton}>
                <View style={styles.checkBox} />
                <Text style={styles.checkBoxText}>서비스 이용약관 동의</Text>
              </Pressable>
            </View>
            <View style={styles.AgreeBox}>
              <Pressable style={styles.agreeButton}>
                <View style={styles.checkBox} />
                <Text style={styles.checkBoxText}>개인정보 처리방침 동의</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable style={styles.signUpButton} onPress={onClickSignUpButton}>
          <Text style={styles.signUpButtonText}>가입하기</Text>
        </Pressable>
        <View style={styles.loginButton}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>로그인하기</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 63,
    paddingBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.color.black1,
  },
  subTitle: {
    fontSize: 14,
    color: theme.color.black1,
    fontWeight: '400',
    marginTop: 35,
  },
  iconBox: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    width: 55,
    height: 55,
  },
  divideBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divideText: {
    padding: 10,
    color: theme.color.black1,
  },
  divide: {
    width: 84,
    borderBottomWidth: 1,
    borderColor: theme.color.gray1,
  },
  inputContainer: {
    paddingVertical: 14,
    gap: 12,
  },
  input: {
    fontSize: 14,
    color: theme.color.black1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.color.gray2,
    borderRadius: 15,
  },
  agreeContainer: {
    paddingTop: 20,
    paddingBottom: 25,
  },
  AgreeBox: {
    paddingHorizontal: 23,
    borderRadius: 15,
    marginTop: 13,
  },
  allAgreeBox: {
    backgroundColor: theme.color.gray2,
    paddingVertical: 15,
  },
  allAgreeText: {
    fontWeight: '500',
  },
  agreeButton: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: 1,
    borderRadius: 5,
    width: 20,
    height: 20,
    borderColor: theme.color.orange,
    backgroundColor: 'white',
  },
  checkBoxText: {
    color: theme.color.black1,
  },
  signUpButton: {
    backgroundColor: theme.color.orange,
    borderRadius: 15,
    paddingVertical: 22,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: theme.color.white,
    fontSize: 20,
    fontWeight: '700',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 26,
    paddingBottom: 90,
  },
  loginButtonText: {
    color: theme.color.black1,
    fontWeight: '400',
    fontSize: 16,
  },
});
