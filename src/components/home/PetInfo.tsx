import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';
import example from '../../assets/im_example.png';
import Letter from '../../assets/ic_home_letter.svg';
import Heart from '../../assets/ic_home_heart.svg';
import Arrow from '../../assets/ic_home_dashborad_arrow.svg';
import { calculateDDay } from '../../utils/date';

type Props = {
  pet: PetDashBoard | undefined;
  letterCount: number | undefined;
};

const PetInfo = ({ pet, letterCount }: Props) => {
  const deathAnniversaryDDay =
    pet?.deathAnniversary && calculateDDay(pet?.deathAnniversary);

  return (
    <View style={styles.infoBox}>
      <Image source={example} style={styles.image} alt="아이 사진" />
      <View style={styles.info}>
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{pet?.name}</Text>
          <Text style={styles.dday}>{deathAnniversaryDDay}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.letter}>
            <Letter />
            <Text
              style={styles.letterText}>{`보낸 편지 ${letterCount}회`}</Text>
          </View>
        </View>
        <View style={styles.heart}>
          <Heart />
          <Text
            style={
              styles.letterText
            }>{`보낸 하트 ${pet?.favoriteCount}회`}</Text>
        </View>
      </View>
      <Arrow style={styles.arrow} />
    </View>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  infoBox: {
    borderWidth: 1,
    borderColor: THEME.COLOR.GRAY_1,
    borderRadius: 15,
    paddingVertical: 24,
    paddingLeft: 24,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    borderRadius: 100,
    width: 88,
    height: 88,
  },
  info: {
    marginLeft: 16,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: THEME.COLOR.ORANGE_1,
    fontSize: 16,
    marginRight: 8,
  },
  dday: {
    fontSize: 14,
    color: THEME.COLOR.GRAY_1,
  },
  content: {
    marginTop: 15,
  },
  letter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  letterText: {
    color: THEME.COLOR.GRAY_4,
  },
  heart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 9,
  },
  arrow: {
    position: 'absolute',
    right: 18,
  },
});
