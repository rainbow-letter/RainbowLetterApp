import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import LetterBox from '../../pages/Letter/LetterBox';
import WriteLetter from '../../pages/Letter/WriteLetter';
import MyPet from '../../pages/Pet/MyPet';
import MyPage from '../../pages/MyPage/MyPage';
import TabBar from './TabBar';
import GoBack from '../common/GoBack';

export type RootBottomTabParamList = {
  Home: undefined;
  LetterBox: undefined;
  WriteLetter: undefined;
  MyPet: undefined;
  MyPage: undefined;
};

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator<RootBottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => <GoBack />,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: '홈' }}
      />
      <Tab.Screen
        name="LetterBox"
        component={LetterBox}
        options={{ title: '편지함' }}
      />
      <Tab.Screen
        name="WriteLetter"
        component={WriteLetter}
        options={{ title: '편지쓰기' }}
      />
      <Tab.Screen name="MyPet" component={MyPet} options={{ title: '아이' }} />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ title: '내 정보' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
