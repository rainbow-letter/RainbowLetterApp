import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { theme } from '../../constants/theme';
import NextImg from '../../assets/myPage_next.svg';
import { getUserInfo } from '../../api/account';
import { RootState } from '../../store/reducer';
import { useAppDispatch } from '../../store';
import accountSlice from '../../slices/account';
import { RootStackParamList } from '../../../Appinner';
import { UserInfoResponse } from '../../model/account.model';
import { updatePhoneNumber } from '../../api/account';
import { handleErrorData } from '../../utils/validate';
import { ErrorData } from '../../model/account.model';

type Props = NativeStackScreenProps<RootStackParamList, 'MyPage'>;

const MyPage = ({ navigation }: Props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoResponse>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [errorData, setErrorData] = useState<ErrorData | null | undefined>(
    null,
  );
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.account.token);
  const newPhoneNumber = useSelector(
    (state: RootState) => state.account.phoneNumber,
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserInfo(token);
        setUserInfo(data);
        dispatch(accountSlice.actions.setPhoneNumber(data.phoneNumber));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };
    getUser();
  }, [token, dispatch]);

  const onClickLogOutButton = useCallback(() => {
    dispatch(accountSlice.actions.removeToken());
    navigation.push('Home');
  }, [dispatch, navigation]);

  const onChangePhoneNumber = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const onClickPhoneNumberUpdateButton = useCallback(async () => {
    if (!isCheck) {
      return setIsCheck(!isCheck);
    }
    if (isCheck) {
      try {
        await updatePhoneNumber({ phoneNumber: phoneNumber }, token);
        setErrorData(null);
        dispatch(accountSlice.actions.setPhoneNumber(phoneNumber));
        setIsCheck(!isCheck);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const data = handleErrorData(error.response && error.response.data);
          setErrorData(data);
        }
      }
    }
  }, [isCheck, phoneNumber, token, dispatch]);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>내 정보</Text>
          <View style={styles.subContainer}>
            <Text style={styles.subTitle}>이메일</Text>
            <Text style={styles.text}>{userInfo?.email}</Text>
          </View>
        </View>
        <View style={[styles.subContainer, styles.phoneBox]}>
          <Text style={[styles.subTitle, styles.phone]}>휴대폰 번호</Text>
          <View style={styles.phoneNumber}>
            {isCheck ? (
              <TextInput
                placeholder={
                  userInfo?.phoneNumber || '-를 제외한 숫자만 입력해주세요.'
                }
                keyboardType="numeric"
                style={
                  errorData?.category === 'phoneNumber'
                    ? [styles.input, styles.errorInput]
                    : styles.input
                }
                maxLength={11}
                value={phoneNumber && phoneNumber}
                onChangeText={onChangePhoneNumber}
              />
            ) : (
              <Text style={styles.text}>
                {newPhoneNumber ||
                  '답장 알림을 문자로 받고 싶다면 등록해보세요'}
              </Text>
            )}
            <Pressable
              style={styles.updateButton}
              onPress={onClickPhoneNumberUpdateButton}>
              <Text style={styles.updateButtonText}>
                {isCheck ? '확인' : '수정'}
              </Text>
            </Pressable>
          </View>
          <Text
            style={
              errorData?.category === 'phoneNumber'
                ? styles.errorMessage
                : [styles.errorMessage, styles.none]
            }>
            {errorData?.category === 'phoneNumber' && errorData.message}
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.arrowBox}
            onPress={() => navigation.push('Reset')}>
            <Text style={styles.subTitle}>비밀번호 변경하기</Text>
            <NextImg />
          </Pressable>
          <View style={styles.divideBox}>
            <View style={styles.divide} />
          </View>
          <Pressable
            style={styles.arrowBox}
            onPress={() => navigation.push('QnA')}>
            <Text style={styles.subTitle}>자주 묻는 질문</Text>
            <NextImg />
          </Pressable>
          <Pressable
            style={styles.arrowBox}
            onPress={() => navigation.push('Secession')}>
            <Text style={styles.subTitle}>탈퇴하기</Text>
            <NextImg />
          </Pressable>
          <Pressable style={styles.arrowBox} onPress={onClickLogOutButton}>
            <Text style={[styles.subTitle, styles.logOutButtonText]}>
              로그아웃
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  infoContainer: {
    marginTop: 28,
  },
  title: {
    color: theme.color.black1,
    fontSize: 20,
    fontWeight: '700',
  },
  subContainer: {
    marginTop: 28,
  },
  subTitle: {
    color: theme.color.black1,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  phone: {
    marginTop: 14,
  },
  text: {
    color: theme.color.black1,
    fontSize: 16,
  },
  arrowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  divideBox: {
    padding: 10,
  },
  divide: {
    borderBottomWidth: 1,
    borderColor: theme.color.whiteGray,
  },
  phoneBox: {
    marginBottom: 10,
  },
  phoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: theme.color.orange,
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: theme.color.white,
    fontSize: 12,
    fontWeight: '700',
  },
  logOutButtonText: {
    color: theme.color.red,
  },
  input: {
    backgroundColor: theme.color.gray2,
    color: theme.color.gray1,
    paddingVertical: 18,
    paddingLeft: 18,
    fontSize: 14,
    borderRadius: 15,
    width: 284,
  },
  phoneUpdateText: {
    color: theme.color.gray1,
    fontSize: 14,
  },
  errorMessage: {
    fontSize: 14,
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
