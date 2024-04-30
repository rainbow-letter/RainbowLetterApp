import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import GoBack from './src/components/GoBack';
import Email from './src/pages/Email';
import Reset from './src/pages/Reset';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Email: undefined;
  Reset: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Appinner = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitle: '회원가입',
            headerLeft: () => <GoBack />,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: '로그인',
            headerLeft: () => <GoBack />,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{
            headerTitle: '비밀번호 찾기',
            headerLeft: () => <GoBack />,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerTitle: '비밀번호 변경',
            headerLeft: () => <GoBack />,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appinner;
