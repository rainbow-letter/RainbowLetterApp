import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import { getDashBoardPets } from '../../api/pets';
import WriteLetterTutorial from '../../components/writeLetter/WriteLetterTutorial';
import PetsSection from '../../components/writeLetter/PetsSection';
import WritingSection from '../../components/writeLetter/WritingSection';
import ImageSection from '../../components/writeLetter/ImageSection';
import { PetDashBoard } from '../../model/Home.model';
import { THEME } from '../../constants/theme';
import PetSelectSlice from '../../slices/petSelect';
import CoverImage from '../../components/common/CoverImage';
import Button from '../../components/common/Button';

const WriteLetter = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.writeLetter);
  const token = useSelector((state: RootState) => state.account.token);
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const getPetList = async () => {
      const { data } = await getDashBoardPets(token);
      setPetsList(data.pets || []);

      const action = PetSelectSlice.actions.setPetInfo(data.pets[0]);
      dispatch(action);
    };

    getPetList();
  }, [token, dispatch]);

  const handleCloseTutorial = () => {
    setShowTutorial(prev => !prev);
  };

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
          onPress={() => Alert.alert('보내기')}
          isCheck={content}
          style={{ marginTop: 56, marginBottom: 70 }}>
          편지 보내기
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
});

export default WriteLetter;
