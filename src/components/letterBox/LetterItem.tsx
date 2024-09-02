import { StyleSheet, Pressable, Text, View, Image } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { isCheckUnread } from '../../utils/letter';
import { RootStackParamList } from '../../../Appinner';
import Stamp from '../../assets/ic_letterBox_letterStamp.png';
import { THEME } from '../../constants/theme';
import LetterStatus from './LetterStatus';

type Props = {
  letter: any;
};

const LetterItem = ({
  letter: { readStatus, status, summary, index, id },
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onClickWriteLetterButton = useCallback(() => {
    navigation.navigate('DetailLetter', { id });
  }, [navigation, id]);

  return (
    <Pressable
      onPress={onClickWriteLetterButton}
      style={
        isCheckUnread(readStatus, status) ? styles.letter : [styles.letter]
      }>
      <View>
        <LetterStatus status={status} readStatus={readStatus} />
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.index}>{index}번째 편지</Text>
      </View>
      <View>
        <Image source={Stamp} />
      </View>
    </Pressable>
  );
};

export default LetterItem;

const styles = StyleSheet.create({
  letter: {
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: THEME.COLOR.GRAY_2,
    borderRadius: 12,
  },
  unReadLetter: {
    backgroundColor: THEME.COLOR.YELLOW_1,
  },
  summary: {
    marginTop: 12,
    color: THEME.COLOR.BLACK_2,
  },
  index: {
    fontSize: 12,
    color: THEME.COLOR.GRAY_4,
    marginTop: 24,
  },
});
