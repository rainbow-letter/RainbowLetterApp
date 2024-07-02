import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { THEME } from '../../constants/theme';
import { CONTENTS_ITEMS } from '../../constants/Home/ContentsSection';
import ContentsBox from './ContentsBox';
import { Contents } from '../../model/Home.model';

const ContentsSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>콘텐츠</Text>

      <View style={styles.contentsWrap}>
        {CONTENTS_ITEMS.map((item: Contents, index: number) => (
          <ContentsBox key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ContentsSection;

const styles = StyleSheet.create({
  section: {
    paddingTop: 30,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
  },
  contentsWrap: {
    marginTop: 20,
    gap: 12,
  },
});
