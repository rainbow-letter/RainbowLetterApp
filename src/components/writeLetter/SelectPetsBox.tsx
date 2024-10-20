import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import { THEME } from '../../constants/theme';
import { PetDashBoard } from '../../model/Home.model';
import DownArr from '../../assets/ic_write_downArrow.svg';
import UpArr from '../../assets/ic_write_upArrow.svg';
import Plus from '../../assets/ic_write_blackPlus.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Appinner';
import { useDispatch, useSelector } from 'react-redux';
import PetSelectSlice from '../../slices/petSelect';
import { RootState } from '../../store/reducer';

type Props = {
  petList: PetDashBoard[];
};

const SelectPetsBox = ({ petList }: Props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.petSelect);
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleShow = () => {
    setIsShow(prev => !prev);
  };

  const handleSelectPet = useCallback(
    (pet: PetDashBoard) => {
      const action = PetSelectSlice.actions.setPetInfo(pet);
      dispatch(action);
      setIsShow(false);
    },
    [dispatch],
  );

  return (
    <View>
      <Pressable style={styles.section} onPress={handleShow}>
        <Text style={styles.petText}>{name}</Text>
        {isShow ? <UpArr /> : <DownArr />}
      </Pressable>
      <View style={styles.relative}>
        {isShow && (
          <View style={styles.dropDown}>
            {petList.map(pet => (
              <Pressable
                key={`pet-dropdown-${pet.id}`}
                style={styles.border}
                onPress={() => handleSelectPet(pet)}>
                <Text style={styles.dropDownText}>{pet.name}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => navigation.navigate('Register')}
              style={styles.plusButton}>
              <Plus />
              <Text style={styles.plusText}>추가하기</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectPetsBox;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    backgroundColor: THEME.COLOR.ORANGE_3,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petText: {
    fontSize: 16,
    color: THEME.COLOR.BLACK_1,
    lineHeight: 18,
  },
  relative: {
    position: 'relative',
  },
  dropDown: {
    position: 'absolute',
    width: '100%',
    marginTop: 6,
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: 15,
  },
  dropDownText: {
    paddingLeft: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: THEME.COLOR.BLACK_1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLOR.WHITEGRAY_2,
  },
  plusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingVertical: 10,
    gap: 4,
  },
  plusText: {
    fontSize: 16,
    color: THEME.COLOR.GRAY_4,
    lineHeight: 20,
  },
});
