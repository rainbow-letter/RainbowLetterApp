import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';

import SignUp from './src/pages/Account/SignUp';
import Login from './src/pages/Account/Login';
import StackGoBack from './src/components/common/StackGoBack';
import BottomTabScreen from './src/components/bottomTab/BottomTabScreen';
import Reset from './src/pages/MyPage/Reset';
import Secession from './src/pages/MyPage/Secession';
import QnA from './src/pages/MyPage/QnA';
import Register from './src/pages/Pets/Register';
import accountSlice from './src/slices/account';
import Donate from './src/pages/Home/Donate';
import DetailLetter from './src/pages/Letter/DetailLetter';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Email: undefined;
  Reset: undefined;
  MyPage: undefined;
  QnA: undefined;
  Secession: undefined;
  Register: any;
  BottomTabScreen: undefined;
  Donate: undefined;
  DetailLetter: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Appinner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const token = await EncryptedStorage.getItem('token');
      const action = accountSlice.actions.setToken({ token });
      dispatch(action);
    };

    getToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <StackGoBack />,
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
          name="Reset"
          component={Reset}
          options={{ title: '비밀번호 변경하기' }}
        />
        <Stack.Screen
          name="Secession"
          component={Secession}
          options={{ title: '탈퇴하기' }}
        />
        <Stack.Screen
          name="QnA"
          component={QnA}
          options={{ title: '자주 묻는 질문' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: '등록하기' }}
        />
        <Stack.Screen
          name="DetailLetter"
          component={DetailLetter}
          options={{ title: '편지함' }}
        />
        <Stack.Screen name="Donate" component={Donate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appinner;
