import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import { RootStackParamList } from '../../Appinner';
import naver from '../assets/login_naver_icon.png';
import google from '../assets/login_google_icon.png';
import { theme } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
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
          <TextInput placeholder="이메일을 입력해주세요" style={styles.input} />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            style={styles.input}
            secureTextEntry
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
        <Pressable style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>가입하기</Text>
        </Pressable>
        <View style={styles.loginButton}>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.loginButtonText}>회원가입하기</Text>
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
