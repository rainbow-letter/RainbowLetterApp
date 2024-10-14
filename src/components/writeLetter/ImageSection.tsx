import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import { THEME } from '../../constants/theme';
import Plus from '../../assets/ic_register_plus.svg';
import Cancel from '../../assets/ic_register_cancel.png';

type Props = {
  setImageFile: any;
  preview: { uri: string } | null;
  setPreview: any;
};

const ImageSection = ({ setImageFile, preview, setPreview }: Props) => {
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
      <View style={styles.titleWrap}>
        <Text style={styles.title}>사진을 보내보세요</Text>
        <Text style={styles.option}>(선택)</Text>
      </View>
      <Text style={styles.count}>딱 1장만 보낼 수 있어요.</Text>
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

export default ImageSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 36,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 18,
    color: THEME.COLOR.BLACK_1,
    fontWeight: 'bold',
  },
  option: {
    fontSize: 18,
    color: THEME.COLOR.GRAY_1,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    color: THEME.COLOR.GRAY_1,
    marginTop: 12,
  },
  upload: {
    marginTop: 26,
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
