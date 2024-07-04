import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

import DismissKeyboardView from '../../hooks/DismissKeyboardView';
import NameSection from '../../components/pets/Register/NameSection';
import DateSection from '../../components/pets/Register/DateSection';
import TypeSection from '../../components/pets/Register/TypeSection';
import OwnerSection from '../../components/pets/Register/OwnerSection';
import PersonailtySection from '../../components/pets/Register/PersonailtySection';
import ImageUploadSection from '../../components/pets/Register/ImageUploadSection';
import Button from '../../components/common/Button';
import { THEME } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

const titleStyle = {
  fontWeight: 'bold',
  color: THEME.COLOR.BLACK_1,
  marginBottom: 20,
  fontSize: 16,
};

const Register = () => {
  const petInfo = useSelector((state: RootState) => state.petRegister);

  return (
    <SafeAreaView style={styles.screen}>
      <DismissKeyboardView>
        <NameSection titleStyle={titleStyle} />
        <DateSection titleStyle={titleStyle} />
        <TypeSection titleStyle={titleStyle} />
        <OwnerSection titleStyle={titleStyle} />
        <PersonailtySection titleStyle={titleStyle} />
        <ImageUploadSection titleStyle={titleStyle} />
        <Button
          isCheck
          onPress={() => console.log(petInfo)}
          style={{ marginBottom: 48 }}>
          등록하기
        </Button>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: THEME.COLOR.WHITE,
    height: '100%',
    paddingHorizontal: 18,
    marginBottom: 30,
  },
});
