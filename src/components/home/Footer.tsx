import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import Blog from '../../assets/ic_home_blog.svg';

const Footer = () => {
  const onClickBlogButtonClick = () => {
    Linking.openURL('https://blog.naver.com/rainbowletter');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.contact}>
        <Text style={styles.black}>문의</Text>
        <View style={styles.divideCol} />
        <Text style={styles.black}>rainbowletter41@gmail.com</Text>
      </View>
      <View style={styles.copyright}>
        <Text style={styles.center}>Copyright © 2023 무지개편지</Text>
        <Text style={styles.center}>All Rights Reserved </Text>
      </View>
      <Pressable onPress={onClickBlogButtonClick}>
        <Blog style={styles.blog} />
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    marginTop: 19,
    paddingBottom: 40,
    marginHorizontal: 'auto',
  },
  contact: {
    position: 'relative',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  divideCol: {
    height: 16,
    borderRightWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
    top: 2,
  },
  copyright: {
    marginTop: 18,
  },
  center: {
    textAlign: 'center',
    color: THEME.COLOR.BLACK_1,
  },
  blog: {
    marginTop: 40,
    marginHorizontal: 'auto',
  },
  black: {
    color: THEME.COLOR.BLACK_1,
  },
});
