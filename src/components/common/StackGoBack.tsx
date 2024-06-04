import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import GoBackSVGImage from '../../assets/ic_header_goBack.svg';

const StackGoBack = () => {
  const navigation = useNavigation();

  return (
    <Pressable hitSlop={2} onPress={() => navigation.goBack()}>
      <GoBackSVGImage />
    </Pressable>
  );
};

export default StackGoBack;
