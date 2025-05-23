import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

import { RootStackParamList } from '../../../Appinner';
import Naver from '../../assets/ic_login_naver_icon.png';
import Google from '../../assets/ic_login_google_icon.png';
import Kakao from '../../assets/ic_login_kakao.png';
import { THEME } from '../../constants/theme';
import { handleErrorData } from '../../utils/validate';
import { tryLogin } from '../../api/account';
import DismissKeyboardView from '../../hooks/DismissKeyboardView';
import accountSlice from '../../slices/account';
import { useAppDispatch } from '../../store';
import { ErrorData } from '../../model/Account.model';
import Button from '../../components/common/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  });
  const [errorData, setErrorData] = useState<ErrorData | null | undefined>(
    null,
  );

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
      setIsLoading(true);
      const { data } = await tryLogin(profile);
      dispatch(
        accountSlice.actions.setToken({
          token: data.token,
        }),
      );
      await EncryptedStorage.setItem('token', data.token);
      navigation.navigate('Home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = handleErrorData(error.response && error.response.data);
        setErrorData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [profile, dispatch, navigation]);

  const canClick =
    profile.email && profile.password && !errorData && !isLoading;

  return (
    <SafeAreaView style={styles.screen}>
      <DismissKeyboardView>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>다시 와주셨네요!</Text>
            <Text style={styles.subTitle}>SNS로 간편 로그인하기</Text>
            <View style={styles.iconBox}>
              <Pressable>
                <Image source={Google} style={styles.icon} />
              </Pressable>
              <Pressable>
                <Image source={Naver} style={styles.icon} />
              </Pressable>
              <Pressable>
                <Image source={Kakao} style={styles.icon} />
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
              style={
                !errorData?.message
                  ? styles.input
                  : [styles.input, styles.errorInput]
              }
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
              style={
                !errorData?.message
                  ? styles.input
                  : [styles.input, styles.errorInput]
              }
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
          <Button isCheck={canClick} onPress={onClickLoginButton}>
            {isLoading ? <ActivityIndicator /> : '로그인하기'}
          </Button>
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
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    height: '100%',
  },
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
    color: THEME.COLOR.BLACK_1,
  },
  subTitle: {
    fontSize: 14,
    color: THEME.COLOR.BLACK_1,
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
    color: THEME.COLOR.BLACK_1,
  },
  divide: {
    width: 84,
    borderBottomWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
  },
  inputContainer: {
    paddingVertical: 4,
  },
  input: {
    fontSize: 14,
    color: THEME.COLOR.BLACK_1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: THEME.COLOR.GRAY_2,
    borderRadius: 15,
    marginTop: 10,
  },
  subButton: {
    alignItems: 'center',
    marginTop: 26,
    paddingBottom: 90,
    flexDirection: 'row',
    position: 'relative',
  },
  subButtonText: {
    color: THEME.COLOR.BLACK_1,
    width: (windowWidth - 36) / 2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
  },
  divideCol: {
    height: 16,
    borderRightWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
    top: 2,
  },
  errorMessage: {
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 8,
    color: THEME.COLOR.RED_1,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: THEME.COLOR.RED_1,
  },
});
