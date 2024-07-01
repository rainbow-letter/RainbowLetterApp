import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';

import Contents from '../../model/Home.model';
import { THEME } from '../../constants/theme';

interface Props {
  item: Contents;
}

const ContentsBox = ({
  item: { title, description, image, isImpotant },
}: Props) => {
  return (
    <Shadow
      style={{ width: '100%' }}
      distance={4}
      startColor="rgba(0, 0, 0, 0.15)">
      <View
        style={
          !isImpotant
            ? styles.contentsBox
            : [styles.contentsBox, styles.important]
        }>
        <View style={styles.contents}>
          <View style={styles.contentsTextWrap}>
            <Text style={styles.contentsTitle}>{title}</Text>
            <Text style={styles.contentsDes}>{description}</Text>
          </View>
          <Image source={image} style={styles.img} />
        </View>
      </View>
    </Shadow>
  );
};

export default ContentsBox;

const styles = StyleSheet.create({
  contentsBox: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentsTextWrap: {
    gap: 8,
  },
  contentsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
  },
  contentsDes: {
    fontSize: 14,
    color: THEME.COLOR.GRAY_4,
  },
  img: {
    width: 82,
    height: 54,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  important: {
    backgroundColor: THEME.COLOR.RED_2,
  },
});
