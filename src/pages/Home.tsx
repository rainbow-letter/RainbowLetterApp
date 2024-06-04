import { Pressable, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/reducer';

const Home = ({ navigation }: any) => {
  const token = useSelector((state: RootState) => state.account.token);

  return (
    <SafeAreaView>
      <View>
        <Text>{token ? '토큰 있음' : '토큰 없음'}</Text>
        <Pressable onPress={() => navigation.push('SignUp')}>
          <Text>회원가입</Text>
        </Pressable>
        <Pressable onPress={() => navigation.push('Login')}>
          <Text>로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
