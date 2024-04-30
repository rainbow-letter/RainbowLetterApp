import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import axios from 'axios';
import Config from 'react-native-config';

import { RootStackParamList } from '../../Appinner';
import naver from '../assets/login_naver_icon.png';
import google from '../assets/login_google_icon.png';
import { theme } from '../constants/theme';
import { handleErrorData } from '../utils/validate';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const windowWidth = Dimensions.get('window').width;

type ErrorData = {
  category: string;
  message: string;
};

const Login = ({ navigation }: Props) => {
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  });
  const [errorData, setErrorData] = useState<ErrorData | null | undefined>(
    null,
  );
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setErrorData(null);
  }, [profile]);

  const onChangeEmail = useCallback(
    (email: string) => {
      setProfile({ ...profile, email: email });
    },
    [profile],
  );

  const onChangePassword = useCallback(
    (password: string) => {
      setProfile({ ...profile, password: password });
    },
    [profile],
  );

  const onClickLoginButton = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${
          Platform.OS === 'ios' ? Config.API_URL : Config.API_URL + '/'
        }api/members/login`,
        profile,
      );
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = handleErrorData(error.response && error.response.data);
        setErrorData(data);
      }
    }
  }, [profile]);

  const canClick = profile.email && profile.password && !errorData;

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>다시 와주셨네요!</Text>
          <Text style={styles.subTitle}>SNS로 간편 로그인하기</Text>
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
          <Text style={styles.divideText}>또는 이메일로 로그인하기</Text>
          <View style={styles.divide} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="이메일을 입력해주세요"
            style={styles.input}
            autoCapitalize="none"
            ref={emailRef}
            keyboardType="email-address"
            value={profile.email}
            onChangeText={onChangeEmail}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            style={styles.input}
            value={profile.password}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={onChangePassword}
            ref={passwordRef}
          />
          <Text style={styles.errorMessage}>
            {errorData?.message && errorData.message}
          </Text>
        </View>
        <Pressable
          style={
            !canClick
              ? styles.LoginButton
              : [styles.LoginButton, styles.LoginButtonActive]
          }
          onPress={onClickLoginButton}>
          <Text style={styles.LoginButtonText}>로그인하기</Text>
        </Pressable>
        <View style={styles.subButton}>
          <Pressable onPress={() => navigation.navigate('Email')}>
            <Text style={styles.subButtonText}>비밀번호 찾기</Text>
          </Pressable>
          <View style={styles.divideCol} />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.subButtonText}>회원가입</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
  LoginButton: {
    backgroundColor: theme.color.gray1,
    borderRadius: 15,
    paddingVertical: 22,
    alignItems: 'center',
    marginTop: 18,
  },
  LoginButtonActive: {
    backgroundColor: theme.color.orange,
  },
  LoginButtonText: {
    color: theme.color.white,
    fontSize: 20,
    fontWeight: '700',
  },
  subButton: {
    alignItems: 'center',
    marginTop: 26,
    paddingBottom: 90,
    flexDirection: 'row',
    position: 'relative',
  },
  subButtonText: {
    color: theme.color.black1,
    width: (windowWidth - 36) / 2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
  },
  divideCol: {
    height: 16,
    borderRightWidth: 1,
    borderColor: theme.color.gray1,
    top: 2,
  },
  errorMessage: {
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 8,
    color: theme.color.red,
  },
});
