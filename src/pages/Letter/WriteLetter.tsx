import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { RootState } from '../../store/reducer';
import { getDashBoardPets } from '../../api/pets';
import { createLetter } from '../../api/letter';
import PetsSection from '../../components/writeLetter/PetsSection';
import WritingSection from '../../components/writeLetter/WritingSection';
import ImageSection from '../../components/writeLetter/ImageSection';
import CoverImage from '../../components/common/CoverImage';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';
import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';
import WriteLetterSlice from '../../slices/writeLetter';
import { generateFormData } from '../../utils/image';
import { uploadImage } from '../../api/image';

type Props = {
  route: any;
};

const WriteLetter = ({ route }: Props) => {
  const writeRef = useRef<any>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const dispatch = useDispatch();
  const letter = useSelector((state: RootState) => state.writeLetter);
  const { token } = useSelector((state: RootState) => state.account);
  const { id } = useSelector((state: RootState) => state.petSelect);
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>();
  const [preview, setPreview] = useState<{ uri: string } | null>(null);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (writeRef.current) {
        writeRef.current?.scrollTo({
          y: 0,
        });
      }
      (async () => {
        setIsFetchLoading(true);
        const { data } = await getDashBoardPets(token);
        setPetsList(data.pets || []);

        if (route.params?.id) {
          const findPet = data.pets.find(pet => pet.id === route.params?.id);
          const action = PetSelectSlice.actions.setPetInfo(findPet);
          dispatch(action);
        } else {
          const action = PetSelectSlice.actions.setPetInfo(data.pets[0]);
          dispatch(action);
        }

        setIsFetchLoading(false);
      })();
    }, [token, dispatch, route.params?.id]),
  );

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);

      const action = PetSelectSlice.actions.setPetInfo(data.pets[0]);
      dispatch(action);
    };

    getPetList();
  }, [token, dispatch]);

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

  const onClickSendLetterButton = useCallback(async () => {
    try {
      setIsLoading(true);
      const objectKey = await getImageObjectKey(imageFile);
      const action = WriteLetterSlice.actions.setLetter({
        image: objectKey,
      });
      dispatch(action);
      await createLetter(token, id, letter);
      dispatch(WriteLetterSlice.actions.clearLetter());
      setPreview(null);
      navigation.navigate('LetterBox', { id: id });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, letter, imageFile, token, navigation, dispatch, getImageObjectKey]);

  const canClick = letter.content && !isLoading;

  if (isFetchLoading) {
    return (
      <View style={styles.spinnerCon}>
        <Text>
          <Spinner size="large" color={THEME.COLOR.ORANGE_1} />
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView ref={writeRef}>
        <PetsSection petsList={petsList} />
        <View style={styles.relativeLayout}>
          <CoverImage />
          <WritingSection />
        </View>
        <ImageSection
          setImageFile={setImageFile}
          setPreview={setPreview}
          preview={preview}
        />
        <Button
          onPress={onClickSendLetterButton}
          isCheck={canClick}
          style={styles.button}>
          {isLoading ? <ActivityIndicator /> : '편지 보내기'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
    paddingHorizontal: 18,
  },
  relativeLayout: {
    position: 'relative',
    marginTop: 16,
  },
  button: {
    marginTop: 56,
    marginBottom: 70,
  },
  spinnerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLOR.WHITE,
  },
});

export default WriteLetter;
