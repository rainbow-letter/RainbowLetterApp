import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import { PetDashBoard } from '../../model/Home.model';
import { calculateDDay } from '../../utils/date';
import { getPetImage } from '../../api/image';
import { THEME } from '../../constants/theme';
import DefaultImage from '../../assets/im_default.png';
import Letter from '../../assets/ic_home_letter.svg';
import Arrow from '../../assets/ic_home_dashborad_arrow.svg';
import { useNavigation } from '@react-navigation/native';
import { RootBottomTabParamList } from '../bottomTab/BottomTabScreen';

type Props = {
  pet: PetDashBoard | undefined;
  letterCount: number | undefined;
};

const PetInfo = ({ pet, letterCount }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const [petImage, setPetImage] = useState<any>();
  const token = useSelector((state: RootState) => state.account.token);

  const deathAnniversaryDDay =
    pet?.deathAnniversary && calculateDDay(pet?.deathAnniversary);

  useEffect(() => {
    const getImage = async () => {
      if (pet?.image) {
        const { request } = await getPetImage(token, pet?.image);
        return setPetImage({ uri: request.responseURL });
      }

      setPetImage(DefaultImage);
    };

    getImage();
  }, [pet, token]);

  const onClickPetCardButton = useCallback(() => {
    navigation.navigate('LetterBox', { id: pet?.id });
  }, [navigation, pet?.id]);

  return (
    <Pressable onPress={onClickPetCardButton} style={styles.infoBox}>
      <Image source={petImage} style={styles.image} alt="아이 사진" />
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
      </View>
      <Arrow style={styles.arrow} />
    </Pressable>
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
