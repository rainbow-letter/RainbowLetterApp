import { Image, ImageProps, StyleSheet, View } from 'react-native';
import React from 'react';

type Props = {
  src: ImageProps;
};

const Banner = ({ src }: Props) => {
  return (
    <View style={styles.imageTest}>
      <Image source={src} style={styles.image} />
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
