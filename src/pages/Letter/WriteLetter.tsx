import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { RootState } from '../../store/reducer';
import { getDashBoardPets } from '../../api/pets';
import { createLetter } from '../../api/letter';
import WriteLetterTutorial from '../../components/writeLetter/WriteLetterTutorial';
import PetsSection from '../../components/writeLetter/PetsSection';
import WritingSection from '../../components/writeLetter/WritingSection';
import ImageSection from '../../components/writeLetter/ImageSection';
import CoverImage from '../../components/common/CoverImage';
import Button from '../../components/common/Button';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';
import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';
import WriteLetterSlice from '../../slices/writeLetter';

const WriteLetter = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const dispatch = useDispatch();
  const letter = useSelector((state: RootState) => state.writeLetter);
  const { token } = useSelector((state: RootState) => state.account);
  const { id } = useSelector((state: RootState) => state.petSelect);
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);

      const action = PetSelectSlice.actions.setPetInfo(data.pets[0]);
      dispatch(action);
    };

    getPetList();
  }, [token, dispatch]);

  const handleCloseTutorial = useCallback(() => {
    setShowTutorial(prev => !prev);
  }, []);

  const onClickSendLetterButton = useCallback(async () => {
    try {
      setIsLoading(true);
      await createLetter(token, id, letter);
      const action = WriteLetterSlice.actions.setLetter({
        content: '',
        summary: '',
      });
      dispatch(action);
      navigation.navigate('LetterBox');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, letter, token, navigation, dispatch]);

  const canClick = letter.content && !isLoading;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <PetsSection petsList={petsList} />
        <View style={styles.relativeLayout}>
          <CoverImage />
          <WritingSection />
        </View>
        <WriteLetterTutorial
          visible={showTutorial}
          onClose={handleCloseTutorial}
        />
        <ImageSection />
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
});

export default WriteLetter;
