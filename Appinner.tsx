import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import GoBack from './src/components/common/GoBack';
import Email from './src/pages/Email';
import Reset from './src/pages/MyPage/Reset';
import MyPage from './src/pages/MyPage/MyPage';
import QnA from './src/pages/MyPage/QnA';
import Secession from './src/pages/MyPage/Secession';
import BottomTabScreen from './src/components/bottomTab/BottomTabScreen';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Email: undefined;
  Reset: undefined;
  MyPage: undefined;
  QnA: undefined;
  Secession: undefined;
  BottomTabScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Appinner = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <GoBack />,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="BottomTabScreen"
          component={BottomTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: '로그인' }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{ title: '비밀번호 찾기' }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{ title: '비밀번호 찾기' }}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ title: '마이페이지' }}
        />
        <Stack.Screen
          name="QnA"
          component={QnA}
          options={{ title: '자주 묻는 질문' }}
        />
        <Stack.Screen
          name="Secession"
          component={Secession}
          options={{ title: '회원 탈퇴' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appinner;
