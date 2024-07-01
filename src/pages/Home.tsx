import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

import MainImage from '../assets/im_home_main.png';
import { THEME } from '../constants/theme';
import PetsSection from '../components/home/PetsSection';
import ThickDivider from '../components/home/ThickDivider';
import ContentsSection from '../components/home/ContentsSection';
import ContactSection from '../components/home/ContactSection';
import ThinDivider from '../components/home/ThinDivider';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Image source={MainImage} style={styles.mainImage} />
        </View>
        <PetsSection />
        <ThickDivider />
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
});
