import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Plus from '../../../assets/ic_register_plus.svg';
import Cancel from '../../../assets/ic_register_cancel.png';
import { THEME } from '../../../constants/theme';

const ImageUploadSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const [preview, setPreview] = useState<{ uri: string }>();
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>();

  const onResponse = useCallback(
    async (response: any) => {
      setPreview({ uri: `data:${response.mime};base64,${response.data}` });
      return ImageResizer.createResizedImage(
        response.path,
        600,
        600,
        response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
        100,
        0,
      ).then(r => {
        setImage({
          uri: r.uri,
          name: r.name,
          type: response.mime,
        });
        console.log(image);
      });
    },
    [image],
  );

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  return (
    <View style={styles.section}>
      <Text style={titleStyle}>프로필 사진</Text>
      <Pressable style={styles.upload} onPress={onChangeFile}>
        {preview ? (
          <Image style={styles.previewImage} source={preview} />
        ) : (
          <Plus />
        )}

        {preview && (
          <Pressable
            style={styles.cancelButton}
            hitSlop={8}
            onPress={() => Alert.alert('ss')}>
            <Image source={Cancel} />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default ImageUploadSection;

const styles = StyleSheet.create({
  section: {
    marginVertical: 40,
  },
  upload: {
    padding: 50,
    backgroundColor: THEME.COLOR.GRAY_2,
    width: 156,
    height: 156,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    position: 'relative',
  },
  previewImage: {
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
  },
  cancelButton: {
    width: 26,
    height: 26,
    borderRadius: 100,
    backgroundColor: THEME.COLOR.GRAY_1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
  },
});
