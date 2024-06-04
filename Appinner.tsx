import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './src/pages/Account/SignUp';
import Login from './src/pages/Account/Login';
import StackGoBack from './src/components/common/StackGoBack';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appinner;
