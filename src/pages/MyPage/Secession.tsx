import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { theme } from '../../constants/theme';
import ACCOUNT_SECESSTION_GUIDELINES from '../../constants/MyPage/AccountSecesstion';
import SecesstionItem from '../../components/myPage/SecesstionItem';
import Secesstion from '../../model/Secesstion.model';
import CheckBox from '../../components/myPage/CheckBox';
import { deleteUserInfo } from '../../api/account';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import accountSlice from '../../slices/account';
import { RootStackParamList } from '../../../Appinner';

type Props = NativeStackScreenProps<RootStackParamList, 'Secession'>;

const Secession = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.account.token);
  const [isCheck, setIsCheck] = useState(false);

  const onClickSecesstionButton = useCallback(async () => {
    try {
      if (!isCheck) {
        return;
      }
      await deleteUserInfo(token);
      dispatch(accountSlice.actions.removeToken());
      navigation.push('Home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  }, [dispatch, navigation, isCheck, token]);

  const renderItems = useCallback(({ item }: { item: Secesstion }) => {
    return <SecesstionItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.secessionContainer}>
          <Text style={styles.title}>탈퇴 안내사항</Text>
          <FlatList
            data={ACCOUNT_SECESSTION_GUIDELINES}
            renderItem={renderItems}
            keyExtractor={item => item.contents}
          />
        </View>
        <View style={styles.checkbox}>
          <CheckBox isCheck={isCheck} setIsCheck={setIsCheck} />
        </View>
        <Pressable
          style={isCheck ? [styles.button, styles.buttonActive] : styles.button}
          onPress={onClickSecesstionButton}>
          <Text style={styles.buttonText}>탈퇴하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Secession;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  secessionContainer: {
    paddingTop: 23,
    paddingHorizontal: 28,
    paddingBottom: 28,
    backgroundColor: theme.color.gray2,
    marginTop: 18,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.color.black1,
    marginBottom: 10,
  },
  checkbox: {
    marginTop: 160,
  },
  button: {
    width: '100%',
    backgroundColor: theme.color.gray1,
    paddingVertical: 22,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.color.white,
  },
  buttonActive: {
    backgroundColor: theme.color.orange,
  },
});
