import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import LetterBox from '../../pages/Letter/LetterBox';
import WriteLetter from '../../pages/Letter/WriteLetter';
import Contents from '../../pages/Contents/Contents';
import MyPage from '../../pages/MyPage/MyPage';
import TabBar from './TabBar';
import TabGoBack from '../common/TabGoBack';

export type RootBottomTabParamList = {
  Home: undefined;
  LetterBox: undefined;
  WriteLetter: undefined;
  Contents: undefined;
  MyPage: undefined;
};

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator<RootBottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => <TabGoBack />,
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
        options={{ title: '편지 쓰기' }}
      />
      <Tab.Screen
        name="Contents"
        component={Contents}
        options={{ title: '콘텐츠' }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ title: '내 정보' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
