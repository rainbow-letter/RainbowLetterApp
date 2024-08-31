import { Image, Pressable, ImageProps, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';

type Props = {
  src: ImageProps;
  page: any;
};

const Banner = ({ src, page }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.imageTest}>
      <Pressable onPress={() => navigation.navigate(page)}>
        <Image source={src} style={styles.image} />
      </Pressable>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  imageTest: {
    width: '100%',
  },
  image: {
    objectFit: 'cover',
  },
});
