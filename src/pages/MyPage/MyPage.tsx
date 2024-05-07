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

type Props = NativeStackScreenProps<RootStackParamList, 'MyPage'>;

const MyPage = ({ navigation }: Props) => {
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.account.token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserInfo(token);
        console.log(data.email);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };
    getUser();
  }, [token]);

  const onClickLogOutButton = useCallback(() => {
    dispatch(accountSlice.actions.removeToken());
    navigation.push('Home');
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>내 정보</Text>
          <View style={styles.subContainer}>
            <Text style={styles.subTitle}>이메일</Text>
            <Text style={styles.text}>example@gmail.com</Text>
          </View>
        </View>
        <View style={[styles.subContainer, styles.phoneBox]}>
          <Text style={[styles.subTitle, styles.phone]}>휴대폰 번호</Text>
          <View style={styles.phoneNumber}>
            {isCheck ? (
              <TextInput placeholder="전화번호" />
            ) : (
              <Text style={styles.text}>01022903261</Text>
            )}

            <Pressable
              style={styles.updateButton}
              onPress={() => setIsCheck(!isCheck)}>
              <Text style={styles.updateButtonText}>
                {isCheck ? '완료' : '수정'}
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <View style={styles.arrowBox}>
            <Text style={styles.subTitle}>비밀번호 변경하기</Text>
            <NextImg />
          </View>
          <View style={styles.divideBox}>
            <View style={styles.divide} />
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.subTitle}>자주 묻는 질문</Text>
            <NextImg />
          </View>
          <View style={styles.arrowBox}>
            <Text style={styles.subTitle}>탈퇴하기</Text>
            <NextImg />
          </View>
          <Pressable style={styles.arrowBox} onPress={onClickLogOutButton}>
            <Text style={styles.subTitle}>로그아웃</Text>
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
});
