import { StyleSheet, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getPetImage } from '../../api/image';
import { RootState } from '../../store/reducer';
import DefaultImage from '../../assets/im_default.png';

const CoverImage = () => {
  const { token } = useSelector((state: RootState) => state.account);
  const pet = useSelector((state: RootState) => state.petSelect);

  const [petImage, setPetImage] = useState<any>('');

  useEffect(() => {
    const getImage = async () => {
      if (pet?.image.objectKey) {
        const { request } = await getPetImage(token, pet?.image.objectKey);
        return setPetImage({ uri: request.responseURL });
      }

      setPetImage(DefaultImage);
    };

    getImage();
  }, [pet, token]);

  return (
    <View style={styles.section}>
      <Image source={petImage} style={styles.image} alt="아이 사진" />
    </View>
  );
};

export default CoverImage;

const styles = StyleSheet.create({
  section: {
    position: 'absolute',
    width: '100%',
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 354,
  },
});
