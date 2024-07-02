import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { THEME } from '../../constants/theme';
import DismissKeyboardView from '../../hooks/DismissKeyboardView';
import { updatePassword } from '../../api/account';
import { ErrorData } from '../../model/Account.model';
import { handleErrorData } from '../../utils/validate';
import { RootState } from '../../store/reducer';
import { RootStackParamList } from '../../../Appinner';
import Button from '../../components/common/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Reset'>;

const Reset = ({ navigation }: Props) => {
  const token = useSelector((state: RootState) => state.account.token);
  const passwordRef = useRef<TextInput | null>(null);
  const [account, setAccount] = useState({
    password: '',
    newPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState<ErrorData | null | undefined>(
    null,
  );

  const onChangePassword = useCallback(
    (value: string) => {
      setAccount({ ...account, password: value });
      setErrorData(null);
    },
    [account],
  );

  const onChangeRePassword = useCallback(
    (value: string) => {
      setAccount({ ...account, newPassword: value });
      setErrorData(null);
    },
    [account],
  );

  const isCheckProperPassword = useCallback(() => {
    if (account.newPassword !== account.password) {
      return setErrorData({
        category: 'newPassword',
        message: '비밀번호를 다시 확인해주세요.',
      });
    }
  }, [account]);

  const onClickUpdateButtonClick = useCallback(async () => {
    try {
      setIsLoading(true);
      isCheckProperPassword();
      await updatePassword({ newPassword: account.newPassword }, token);
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = handleErrorData(error.response && error.response.data);
        setErrorData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [account, token, isCheckProperPassword, navigation]);

  const canClick = account.password && account.newPassword && !isLoading;

  return (
    <SafeAreaView style={styles.screen}>
      <DismissKeyboardView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>비밀번호 변경하기</Text>
            <Text style={styles.description}>
              새로운 비밀번호로 입력해주세요.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>새 비밀번호</Text>
              <TextInput
                style={
                  errorData?.category === 'password'
                    ? [styles.input, styles.errorInput]
                    : styles.input
                }
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry
                value={account.password}
                onChangeText={onChangePassword}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
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
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>새 비밀번호 확인</Text>
              <TextInput
                style={
                  errorData?.category === 'newPassword'
                    ? [styles.input, styles.errorInput]
                    : styles.input
                }
                value={account.newPassword}
                onChangeText={onChangeRePassword}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry
                ref={passwordRef}
              />
              <Text
                style={
                  errorData?.category === 'newPassword'
                    ? styles.errorMessage
                    : [styles.errorMessage, styles.none]
                }>
                {errorData?.category === 'newPassword' && errorData.message}
              </Text>
            </View>
          </View>
          <Button isCheck={canClick} onPress={onClickUpdateButtonClick}>
            {isLoading ? <ActivityIndicator /> : '변경하기'}
          </Button>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default Reset;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 18,
    backgroundColor: THEME.COLOR.WHITE,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: THEME.COLOR.BLACK_1,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: THEME.COLOR.BLACK_1,
    marginTop: 18,
  },
  inputContainer: {
    marginTop: 58,
  },
  inputBox: {
    marginBottom: 30,
  },
  inputText: {
    fontSize: 14,
    color: THEME.COLOR.BLACK_1,
  },
  input: {
    paddingVertical: 18,
    paddingLeft: 18,
    backgroundColor: THEME.COLOR.GRAY_2,
    marginTop: 16,
    borderRadius: 15,
  },
  errorMessage: {
    fontSize: 14,
    marginTop: 8,
    color: THEME.COLOR.RED_1,
    paddingLeft: 10,
  },
  none: {
    display: 'none',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: THEME.COLOR.RED_1,
  },
});
