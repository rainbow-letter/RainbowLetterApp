import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
import { registerPetInfo, getPetInfo, updatePetInfo } from '../../api/pets';
import { isCheckFutureDate } from '../../utils/date';
import PetRegisterSlice from '../../slices/pets';
import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';
import { getPetImage } from '../../api/image';
import { getImageObjectKey } from '../../utils/image';

const titleStyle = {
  fontWeight: 'bold',
  color: THEME.COLOR.BLACK_1,
  marginBottom: 20,
  fontSize: 16,
};

type Props = {
  route: any;
};

const Register = ({ route }: Props) => {
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

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(PetRegisterSlice.actions.clearPetInfo());
      };
    }, [dispatch]),
  );

  useEffect(() => {
    (async () => {
      // dispatch(PetRegisterSlice.actions.clearPetInfo());
      if (route.params?.id) {
        const { data } = await getPetInfo(token, route.params?.id);
        const action = PetRegisterSlice.actions.setUpdatePetInfo(data);
        dispatch(action);
      }
    })();
  }, [token, route.params?.id, dispatch]);

  useEffect(() => {
    const getImage = async () => {
      if (route.params?.id && petInfo.image) {
        const { request } = await getPetImage(token, petInfo.image);
        return setPreview({ uri: request.responseURL });
      }
    };

    getImage();
  }, [token, petInfo.image, route.params?.id]);

  const onClickPetRegisterButton = useCallback(async () => {
    try {
      setIsLoading(true);
      let objectKey = petInfo.image;

      if (imageFile) {
        objectKey = await getImageObjectKey(imageFile, token);
        const action = PetRegisterSlice.actions.setPetInfo({
          image: objectKey,
        });
        dispatch(action);
      }

      // eslint-disable-next-line
      const { year, month, day, ...info } = petInfo;

      const isFuture = isCheckFutureDate(info.deathAnniversary);
      if (isFuture) {
        return Alert.alert('날짜를 다시 확인해주세요!');
      }
      if (route.params?.id) {
        await updatePetInfo(token, route.params?.id, {
          ...info,
          image: objectKey,
        });
      } else {
        await registerPetInfo(token, { ...info, image: objectKey });
      }
      dispatch(PetRegisterSlice.actions.clearPetInfo());
      navigation.navigate('LetterBox');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [navigation, dispatch, token, petInfo, imageFile, route.params?.id]);

  const canClick =
    petInfo.name && petInfo.species && petInfo.owner && preview && !isLoading;

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
