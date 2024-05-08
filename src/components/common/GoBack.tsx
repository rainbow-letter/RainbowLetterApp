import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import GoBackSVGImage from '../../assets/header_goBack.svg';

const GoBack = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <GoBackSVGImage />
    </Pressable>
  );
};

export default GoBack;
