import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';
import { THEME } from '../../constants/theme';
import House from '../../assets/im_letterBox_house.png';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';

const NoPets = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onClickPetRegisterButton = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <Image source={House} />
      <Text style={styles.title}>앗, 편지를 받을 아이가 없어요</Text>
      <Text style={styles.contents}>우리 아이를 등록하러 가볼까요?</Text>
      <Button onPress={onClickPetRegisterButton} isCheck>
        등록하기
      </Button>
    </View>
  );
};

export default NoPets;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
    paddingHorizontal: 18,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  contents: {
    textAlign: 'center',
    marginBottom: 26,
  },
});
