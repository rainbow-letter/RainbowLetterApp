import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';

import { theme } from '../constants/theme';
import DismissKeyboardView from '../hooks/DismissKeyboardView';
import { updatePassword } from '../api/account';

const Reset = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onChangeRePassword = useCallback((value: string) => {
    setRePassword(value);
  }, []);

  const onClickUpdateButtonClick = useCallback(() => {
    try {
      setIsLoading(true);
      updatePassword({ newPassword: password });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [password]);

  const canClick = password && rePassword && !isLoading;

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
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
                style={styles.input}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry
                value={password}
                onChangeText={onChangePassword}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>새 비밀번호 확인</Text>
              <TextInput
                style={styles.input}
                value={rePassword}
                onChangeText={onChangeRePassword}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry
                ref={passwordRef}
              />
            </View>
          </View>
          <Pressable
            disabled={!canClick}
            style={
              !canClick
                ? styles.updateButton
                : [styles.updateButton, styles.updateButtonActive]
            }
            onPress={onClickUpdateButtonClick}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.updateButtonText}>변경하기</Text>
            )}
          </Pressable>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default Reset;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    backgroundColor: theme.color.white,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.color.black1,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.color.black1,
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
    color: theme.color.black1,
  },
  input: {
    paddingVertical: 18,
    paddingLeft: 18,
    backgroundColor: theme.color.gray2,
    marginTop: 16,
    borderRadius: 15,
  },
  updateButtonActive: {
    backgroundColor: theme.color.orange,
  },
  updateButton: {
    backgroundColor: theme.color.gray1,
    paddingVertical: 22,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 12,
  },
  updateButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.color.white,
  },
});
