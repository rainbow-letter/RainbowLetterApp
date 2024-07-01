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
import ContentsSection from '../components/home/ContentsSection';
import ContactSection from '../components/home/ContactSection';
import ThinDivider from '../components/home/ThinDivider';
import Footer from '../components/home/Footer';

const Home = () => {
  const token = useSelector((state: RootState) => state.account.token);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Image source={MainImage} style={styles.mainImage} />
        </View>
        <View>{token ? <PetBox /> : <AccountBox />}</View>
        <View style={styles.divider} />
        <ContentsSection />
        <ContactSection />
        <ThinDivider />
        <Footer />
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
  divider: {
    height: 10,
    backgroundColor: THEME.COLOR.GRAY_2,
  },
});
