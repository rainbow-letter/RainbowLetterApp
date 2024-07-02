import { StyleSheet, Text, View, Pressable, Image, Alert } from 'react-native';
import React, { useState } from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import Plus from '../../../assets/ic_register_plus.svg';
import Cancel from '../../../assets/ic_register_cancel.png';
import { THEME } from '../../../constants/theme';

const ImageUploadSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <View style={styles.section}>
      <Text style={titleStyle}>프로필 사진</Text>
      <Pressable style={styles.upload}>
        <Plus />

        {isShow && (
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
