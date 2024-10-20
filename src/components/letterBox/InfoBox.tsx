import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../../Appinner';
import { THEME } from '../../constants/theme';
import Tag from '../common/Tag';
import { RootState } from '../../store/reducer';
import { calculateDDay } from '../../utils/date';

const InfoBox = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { name, personalities, owner, deathAnniversary, id } = useSelector(
    (state: RootState) => state.petSelect,
  );

  const deathAnniversaryDDay =
    deathAnniversary && calculateDDay(deathAnniversary);

  const onClickProfileEditButton = useCallback(() => {
    navigation.navigate('Register', { id });
  }, [navigation, id]);

  return (
    <View style={styles.infoSection}>
      <View style={styles.infoBox}>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.deathAnniversary}>{deathAnniversaryDDay}</Text>
        </View>
        <Pressable
          onPress={onClickProfileEditButton}
          style={styles.profileUpdateButton}>
          <Text style={styles.profileUpdateButtonText}>프로필 수정</Text>
        </Pressable>
        <View style={styles.personalityBox}>
          {personalities?.map(personailty => (
            <View key={`pet-${personailty}`}>
              <Tag personailty={personailty} />
            </View>
          ))}
        </View>
        <Text style={styles.owner}>아이에게 나는 사랑하는 {owner}</Text>
      </View>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  infoSection: {
    paddingTop: 242,
  },
  infoBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 30,
    position: 'relative',
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: THEME.COLOR.BLACK_1,
  },
  deathAnniversary: {
    color: THEME.COLOR.ORANGE_1,
    fontSize: 18,
  },
  profileUpdateButton: {
    position: 'absolute',
    top: 24,
    right: 18,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: THEME.COLOR.GRAY_4,
  },
  profileUpdateButtonText: {
    color: THEME.COLOR.GRAY_4,
    lineHeight: 18,
  },
  personalityBox: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 6,
  },
  owner: {
    marginTop: 16,
    fontSize: 18,
    color: THEME.COLOR.BLACK_1,
  },
});
