import { Pressable, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';

const Home = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Pressable onPress={() => navigation.push('SignUp')}>
        <Text>회원가입</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Login')}>
        <Text>로그인</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Reset')}>
        <Text>비밀번호 변경</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
