import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';

import CoverImage from '../common/CoverImage';
import ThickDivider from '../home/ThickDivider';
import { THEME } from '../../constants/theme';
import { Pets } from '../../model/Pet.model';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import Tag from '../common/Tag';

type Props = {
  petsList: Pets[];
};

const PetInfoCard = ({ petsList }: Props) => {
  const { personalities, owner } = useSelector(
    (state: RootState) => state.petSelect,
  );

  console.log(petsList);
  return (
    <View>
      <CoverImage />
      <View style={styles.infoSection}>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Text style={styles.name}>초롱이</Text>
            <Text style={styles.deathAnniversary}>D+233</Text>
          </View>
          <Pressable style={styles.profileUpdateButton}>
            <Text style={styles.profileUpdateButtonText}>프로필 수정</Text>
          </Pressable>
          <View style={styles.personalityBox}>
            {personalities?.map(personailty => (
              <Tag personailty={personailty} />
            ))}
          </View>
          <Text style={styles.owner}>아이에게 나는 사랑하는 {owner}</Text>
        </View>
      </View>
      <ThickDivider />
    </View>
  );
};

export default PetInfoCard;

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
  },
  deathAnniversary: {
    color: THEME.COLOR.ORANGE_1,
    fontSize: 18,
    fontWeight: 500,
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
