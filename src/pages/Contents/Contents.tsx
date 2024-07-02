import { Pressable, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';

const Contents = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Contents</Text>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text>아이 등록하러 가기</Text>
      </Pressable>
    </View>
  );
};

export default Contents;
