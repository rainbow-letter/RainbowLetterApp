import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import DismissKeyboardView from '../../hooks/DismissKeyboardView';
import NameSection from '../../components/pets/Register/NameSection';
import DateSection from '../../components/pets/Register/DateSection';
import TypeSection from '../../components/pets/Register/TypeSection';
import OwnerSection from '../../components/pets/Register/OwnerSection';
import PersonailtySection from '../../components/pets/Register/PersonailtySection';
import ImageUploadSection from '../../components/pets/Register/ImageUploadSection';
import Button from '../../components/common/Button';
import { THEME } from '../../constants/theme';
import { RootState } from '../../store/reducer';
import { registerPetInfo } from '../../api/pets';
import { isCheckFutureDate } from '../../utils/date';

const titleStyle = {
  fontWeight: 'bold',
  color: THEME.COLOR.BLACK_1,
  marginBottom: 20,
  fontSize: 16,
};

const Register = () => {
  const petInfo = useSelector((state: RootState) => state.petRegister);
  const { token } = useSelector((state: RootState) => state.account);
  const [isLoading, setIsLoading] = useState(false);

  const onClickPetRegisterButton = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: 이미지 업로드 수정 -> formData로? / Content-Type?
      const { year, month, day, ...info } = petInfo;

      const isFuture = isCheckFutureDate(info.deathAnniversary);
      if (isFuture) {
        return Alert.alert('날짜를 다시 확인해주세요!');
      }
      await registerPetInfo(token, info);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [petInfo, token]);

  const canClick =
    petInfo.name &&
    petInfo.species &&
    petInfo.owner &&
    petInfo.image &&
    !isLoading;

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
          isCheck={canClick}
          onPress={onClickPetRegisterButton}
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
