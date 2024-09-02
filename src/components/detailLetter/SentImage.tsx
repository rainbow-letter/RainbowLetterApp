import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getPetImage } from '../../api/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

type Props = {
  objectKey: string | undefined;
};

const SentImage = ({ objectKey }: Props) => {
  const { token } = useSelector((state: RootState) => state.account);
  const [image, setImage] = useState<any>('');

  useEffect(() => {
    const getImage = async () => {
      if (objectKey) {
        const { request } = await getPetImage(token, objectKey);
        return setImage({ uri: request.responseURL });
      }
    };

    getImage();
  }, [token, objectKey]);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>아이에게 보낸 사진</Text>
      <Image style={styles.image} src={image.uri} alt="아이에게 보낸 사진" />
    </View>
  );
};

export default SentImage;

const styles = StyleSheet.create({
  section: {
    marginTop: 64,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: 354,
    marginTop: 30,
  },
});
