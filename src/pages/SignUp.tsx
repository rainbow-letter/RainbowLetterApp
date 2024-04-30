import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import axios from 'axios';

import { RootStackParamList } from '../../Appinner';
import naver from '../assets/login_naver_icon.png';
import google from '../assets/login_google_icon.png';
import { theme } from '../constants/theme';
import { handleErrorData } from '../utils/validate';
import Agree from '../components/Agree';
import { tryLogin, trySignUp } from '../api/account';
import DismissKeyboardView from '../hooks/DismissKeyboardView';
import accountSlice from '../slices/account';
import { useAppDispatch } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

type ErrorData = {
  category: string;
  message: string;
};

const SignUp = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState<ErrorData | null | undefined>(
    null,
  );

  const canClick =
    profile.email && profile.password && isChecked && !errorData && !isLoading;

  useEffect(() => {
    setErrorData(null);
  }, [profile]);

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
      setIsLoading(true);
      if (!isChecked) {
        return Alert.alert(
          '서비스 이용약관 및 개인정보 처리방침 동의를 해주세요.',
        );
      }
      await trySignUp(profile);
      const { token } = await tryLogin(profile);
      dispatch(
        accountSlice.actions.setToken({
          token: token,
        }),
      );
      navigation.navigate('Home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = handleErrorData(error.response && error.response.data);
        setErrorData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [profile, isChecked, dispatch, navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <DismissKeyboardView>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>무료로 편지를 써보세요!</Text>
            <Text style={styles.subTitle}>SNS로 간편 가입하기</Text>
            <View style={styles.iconBox}>
              <Pressable onPress={() => Alert.alert('구현 중입니다.')}>
                <Image source={google} style={styles.icon} />
              </Pressable>
              <Pressable onPress={() => Alert.alert('구현 중입니다.')}>
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
              style={
                errorData?.category === 'email'
                  ? [styles.input, styles.errorInput]
                  : styles.input
              }
              value={profile.email}
              onChangeText={onChangeEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              ref={emailRef}
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
            <Text
              style={
                errorData?.category === 'email'
                  ? styles.errorMessage
                  : [styles.errorMessage, styles.none]
              }>
              {errorData?.category === 'email' && errorData.message}
            </Text>
            <TextInput
              placeholder="비밀번호를 입력해주세요"
              style={
                errorData?.category === 'password'
                  ? [styles.input, styles.errorInput]
                  : styles.input
              }
              value={profile.password}
              secureTextEntry
              onChangeText={onChangePassword}
              ref={passwordRef}
            />
            <Text
              style={
                errorData?.category === 'password'
                  ? styles.errorMessage
                  : [styles.errorMessage, styles.none]
              }>
              {errorData?.category === 'password' && errorData.message}
            </Text>
          </View>
          <Agree isChecked={isChecked} setIsChecked={setIsChecked} />
          <Pressable
            disabled={!canClick}
            style={
              !canClick
                ? styles.signUpButton
                : [styles.signUpButton, styles.signUpButtonActive]
            }
            onPress={onClickSignUpButton}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.signUpButtonText}>가입하기</Text>
            )}
          </Pressable>
          <View style={styles.loginButton}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginButtonText}>로그인하기</Text>
            </Pressable>
          </View>
        </ScrollView>
      </DismissKeyboardView>
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
    paddingVertical: 4,
  },
  input: {
    fontSize: 14,
    color: theme.color.black1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.color.gray2,
    borderRadius: 15,
    marginTop: 10,
  },
  signUpButton: {
    backgroundColor: theme.color.gray1,
    borderRadius: 15,
    paddingVertical: 22,
    alignItems: 'center',
  },
  signUpButtonActive: {
    backgroundColor: theme.color.orange,
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
  errorMessage: {
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 8,
    color: theme.color.red,
  },
  none: {
    display: 'none',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: theme.color.red,
  },
});
