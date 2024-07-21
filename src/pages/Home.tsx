import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import { THEME } from '../constants/theme';
import MainBanner from '../components/home/MainBanner';
import PetsSection from '../components/home/PetsSection';
import ThickDivider from '../components/home/ThickDivider';
import LetterShowCase from '../components/home/LetterShowCase';
import LetterShowCaseButton from '../components/home/LetterShowCaseButton';
import ContentsSection from '../components/home/ContentsSection';
import ContactSection from '../components/home/ContactSection';
import ThinDivider from '../components/home/ThinDivider';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <MainBanner />
        <PetsSection />
        <ThickDivider />
        <LetterShowCase />
        <LetterShowCaseButton />
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
});
