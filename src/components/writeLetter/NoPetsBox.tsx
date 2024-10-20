import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

import Plus from '../../assets/ic_write_plus.svg';
import { THEME } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';

const NoPetsBox = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.box}
      onPress={() => navigation.navigate('Register')}>
      <Plus />
      <Text style={styles.boxText}>편지 받을 아이를 등록해주세요</Text>
    </Pressable>
  );
};

export default NoPetsBox;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    borderStyle: 'dashed',
    borderRadius: 15,
    paddingVertical: 16,
  },
  boxText: {
    fontSize: 16,
    color: THEME.COLOR.ORANGE_1,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
