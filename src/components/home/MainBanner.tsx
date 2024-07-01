import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Banner from './Banner';
import bannerList from './constants';
import { THEME } from '../../constants/theme';

const MainBanner = () => {
  return (
    <View style={styles.screen}>
      <Swiper
        autoplay
        autoplayTimeout={6}
        paginationStyle={{ top: -158, gap: 2 }}
        dotStyle={{ backgroundColor: THEME.COLOR.GRAY_5 }}
        activeDotColor={THEME.COLOR.ORANGE_1}>
        {bannerList.map(({ id, image }) => (
          <Banner key={id} src={image} />
        ))}
      </Swiper>
    </View>
  );
};

export default MainBanner;

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: 228,
  },
});
