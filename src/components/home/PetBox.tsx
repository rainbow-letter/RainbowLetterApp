import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../../Appinner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getDashBoardPets } from '../../api/pets';
import { RootState } from '../../store/reducer';
import { PetDashBoard } from '../../model/Home.model';
import NameSection from './NameSection';
import PetInfo from './PetInfo';
import { THEME } from '../../constants/theme';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const PetBox = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [petsList, setPetsList] = useState<PetDashBoard[]>([]);
  const [selectedPet, setSelectedPet] = useState<string>('');
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const token = useSelector((state: RootState) => state.account.token);

  const onClickPetRegisterButton = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsFetchLoading(true);
        const { data } = await getDashBoardPets(token);
        setPetsList(data.pets || []);
        setIsFetchLoading(false);
        if (data.pets.length > 0) {
          setSelectedPet(data.pets[0].name || '');
        }
      })();
    }, [token]),
  );

  const petsNames = petsList.map(pet => pet.name);
  const filteredPet = petsList.find(pet => pet.name === selectedPet);

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
    <View style={styles.section}>
      <Text style={styles.title}>우리 아이</Text>
      {petsList.length < 1 ? (
        <View style={styles.noPetBox}>
          <Text style={styles.noPetTitle}>앗, 편지를 받을 아이가 없어요</Text>
          <Text style={styles.noPetDes}>우리 아이를 등록하러 가볼까요?</Text>
          <Button isCheck onPress={onClickPetRegisterButton}>
            등록하기
          </Button>
        </View>
      ) : (
        <>
          <NameSection
            petsNames={petsNames}
            onClick={setSelectedPet}
            selectedPet={selectedPet}
          />
          <PetInfo pet={filteredPet} letterCount={filteredPet?.letterCount} />
        </>
      )}
    </View>
  );
};

export default PetBox;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingTop: 23,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 6,
    color: THEME.COLOR.BLACK_1,
  },
  noPetBox: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: THEME.COLOR.GRAY_1,
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  noPetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26,
    textAlign: 'center',
  },
  noPetDes: {
    marginTop: 13,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 27,
  },
  spinnerCon: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
