import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { uploadImage } from '../../api/image';
import { generateFormData } from '../../utils/image';
import PetRegisterSlice from '../../slices/pets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';

const titleStyle = {
  fontWeight: 'bold',
  color: THEME.COLOR.BLACK_1,
  marginBottom: 20,
  fontSize: 16,
};

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const dispatch = useDispatch();
  const petInfo = useSelector((state: RootState) => state.petRegister);
  const { token } = useSelector((state: RootState) => state.account);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>();
  const [preview, setPreview] = useState<{ uri: string } | null>();

  const getImageObjectKey = useCallback(
    async (image: any) => {
      if (imageFile) {
        const formData = generateFormData(image);
        const { data } = await uploadImage(token, formData);

        return data.objectKey;
      }
    },
    [token, imageFile],
  );

  const onClickPetRegisterButton = useCallback(async () => {
    try {
      setIsLoading(true);
      const objectKey = await getImageObjectKey(imageFile);
      const action = PetRegisterSlice.actions.setPetInfo({
        image: objectKey,
      });
      dispatch(action);

      // eslint-disable-next-line
      const { year, month, day, ...info } = petInfo;

      const isFuture = isCheckFutureDate(info.deathAnniversary);
      if (isFuture) {
        return Alert.alert('날짜를 다시 확인해주세요!');
      }
      await registerPetInfo(token, info);
      dispatch(PetRegisterSlice.actions.clearPetInfo());
      navigation.navigate('LetterBox');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [navigation, dispatch, token, getImageObjectKey, petInfo, imageFile]);

  const canClick =
    petInfo.name && petInfo.species && petInfo.owner && imageFile && !isLoading;

  return (
    <SafeAreaView style={styles.screen}>
      <DismissKeyboardView>
        <NameSection titleStyle={titleStyle} />
        <DateSection titleStyle={titleStyle} />
        <TypeSection titleStyle={titleStyle} />
        <OwnerSection titleStyle={titleStyle} />
        <PersonailtySection titleStyle={titleStyle} />
        <ImageUploadSection
          setImageFile={setImageFile}
          setPreview={setPreview}
          preview={preview}
        />
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
