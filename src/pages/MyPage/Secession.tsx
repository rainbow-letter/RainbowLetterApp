import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { THEME } from '../../constants/theme';
import ACCOUNT_SECESSTION_GUIDELINES from '../../constants/MyPage/AccountSecesstion';
import SecesstionItem from '../../components/myPage/SecesstionItem';
import { SecessionItem } from '../../model/MyPage.model';
import CheckBox from '../../components/myPage/CheckBox';
import { deleteUserInfo } from '../../api/account';
import { RootState } from '../../store/reducer';
import { useAppDispatch } from '../../store';
import accountSlice from '../../slices/account';
import { RootStackParamList } from '../../../Appinner';
import Button from '../../components/common/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Secession'>;

const Secession = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.account.token);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickSecesstionButton = useCallback(async () => {
    try {
      if (!isCheck) {
        return;
      }
      setIsLoading(true);
      await deleteUserInfo(token);
      dispatch(accountSlice.actions.removeToken());
      navigation.push('Home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigation, isCheck, token]);

  const renderItems = useCallback(({ item }: { item: SecessionItem }) => {
    return <SecesstionItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
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
        <Button isCheck={isCheck} onPress={onClickSecesstionButton}>
          {isLoading ? <ActivityIndicator /> : '탈퇴하기'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Secession;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 18,
  },
  secessionContainer: {
    paddingTop: 23,
    paddingHorizontal: 28,
    paddingBottom: 28,
    backgroundColor: THEME.COLOR.GRAY_2,
    marginTop: 18,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.COLOR.BLACK_1,
    marginBottom: 10,
  },
  checkbox: {
    marginTop: 160,
    marginBottom: 24,
  },
});
