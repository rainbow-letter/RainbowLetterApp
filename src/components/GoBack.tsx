import { Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = {
  src: {
    uri?: string;
  };
};

const GoBack = ({ src }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Image source={src} />
    </Pressable>
  );
};

export default GoBack;
