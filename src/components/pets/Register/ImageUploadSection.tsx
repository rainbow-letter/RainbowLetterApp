import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useCallback } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import Plus from '../../../assets/ic_register_plus.svg';
import Cancel from '../../../assets/ic_register_cancel.png';
import { THEME } from '../../../constants/theme';

type Props = {
  setImageFile: any;
  setPreview: any;
  preview: { uri: string } | null | undefined;
};

const ImageUploadSection = ({ setImageFile, setPreview, preview }: Props) => {
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
        setImageFile({
          uri: r.uri,
          name: r.name,
          type: response.mime,
        });
      });
    },
    [setImageFile, setPreview],
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

  const handleImageDelete = useCallback(() => {
    setPreview(null);
    setImageFile(null);
  }, [setImageFile, setPreview]);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>프로필 사진</Text>
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
            onPress={handleImageDelete}>
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
  title: {
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
    marginBottom: 20,
    fontSize: 16,
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
    width: 153,
    height: 153,
    borderRadius: 15,
    position: 'absolute',
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
