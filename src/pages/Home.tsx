import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/reducer';
import MainImage from '../assets/im_home_main.png';
import { THEME } from '../constants/theme';
import AccountBox from '../components/home/AccountBox';
import PetBox from '../components/home/PetBox';

const Home = () => {
  const token = useSelector((state: RootState) => state.account.token);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Image source={MainImage} style={styles.mainImage} />
        </View>
        <View>{token ? <PetBox /> : <AccountBox />}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: THEME.COLOR.WHITE,
    height: '100%',
  },
  mainImage: {
    width: '100%',
  },
});
