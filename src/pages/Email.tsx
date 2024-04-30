import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { theme } from '../constants/theme';
import { handleErrorData } from '../utils/validate';
import { submitEmail } from '../api/account';

type ErrorData = {
  category: string;
  message: string;
};

const Email = () => {
  const [profile, setEmail] = useState({
    email: '',
  });
  const [errorData, setErrorData] = useState<ErrorData | undefined | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorData(null);
  }, [profile]);

  const onChangeEmail = useCallback(
    (email: string) => {
      setEmail({ ...profile, email: email });
    },
    [profile],
  );

  const onSubmitButtonClick = useCallback(async () => {
    try {
      setIsLoading(true);
      await submitEmail(profile);
      Alert.alert('비밀번호 변경 메일이 발송됐어요!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = handleErrorData(error.response && error.response.data);
        setErrorData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>비밀번호 재설정</Text>
          <Text style={styles.description}>
            이메일로 비밀번호 재설정 링크가 발송돼요
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="이메일을 입력해주세요"
            style={styles.input}
            onChangeText={onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.errorMessage}>
            {errorData?.message && errorData.message}
          </Text>
          <Pressable
            disabled={isLoading}
            style={styles.submitButton}
            onPress={onSubmitButtonClick}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.submitButtonText}>제출하기</Text>
            )}
          </Pressable>
        </View>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>메일을 받지 못했다면</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  'https://blog.naver.com/rainbowletter/223328951209',
                )
              }>
              <Text style={[styles.noticeText, styles.notice]}>공지사항</Text>
            </Pressable>
            <Text style={styles.noticeText}>을 확인해주세요</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    backgroundColor: theme.color.white,
  },
  headerContainer: { alignItems: 'center', marginTop: 133 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 46.8,
    color: theme.color.black1,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 29.88,
    color: theme.color.black1,
  },
  input: {
    backgroundColor: theme.color.gray2,
    paddingVertical: 15,
    paddingLeft: 19,
    borderRadius: 15,
    marginTop: 65,
  },
  submitButton: {
    backgroundColor: theme.color.orange,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    marginTop: 32,
  },
  submitButtonText: {
    color: theme.color.white,
    fontSize: 20,
    fontWeight: '700',
  },
  noticeContainer: {
    marginTop: 27,
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 16,
    color: theme.color.gray1,
    fontWeight: '400',
  },
  notice: {
    textDecorationLine: 'underline',
  },
  errorMessage: {
    fontSize: 14,
    paddingLeft: 10,
    marginTop: 8,
    color: theme.color.red,
  },
});
