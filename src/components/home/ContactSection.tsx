import { StyleSheet, View } from 'react-native';
import React from 'react';

import KakaoContact from './KakaoContact';
import PhoneButton from './PhoneButton';

const ContactSection = () => {
  return (
    <View style={styles.section}>
      <KakaoContact />
      <PhoneButton />
    </View>
  );
};

export default ContactSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 48,
    paddingHorizontal: 25,
    paddingBottom: 31,
  },
});
