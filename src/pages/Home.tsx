import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

const Home = ({ navigation }: any) => {
  const token = useSelector((state: RootState) => state.account.token);

  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.push('SignUp')}>
        <Text>회원가입</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Login')}>
        <Text>로그인</Text>
      </Pressable>
      {token && (
        <View>
          <Pressable onPress={() => navigation.push('Reset')}>
            <Text>비밀번호 변경</Text>
          </Pressable>
          <Pressable onPress={() => navigation.push('MyPage')}>
            <Text>마이페이지</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
