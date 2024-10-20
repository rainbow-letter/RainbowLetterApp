import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useRef, useMemo, useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../../../Appinner';
import { PetsList } from '../../model/Pet.model';
import Arrow from '../../assets/ic_letterBox_arrow.svg';
import { RootState } from '../../store/reducer';
import { THEME } from '../../constants/theme';
import Plus from '../../assets/ic_letterBox_add.svg';
import PetSelectSlice from '../../slices/petSelect';

type Props = {
  petsList: PetsList[];
};

const PetToggle = ({ petsList }: Props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.petSelect);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const handleSelectPet = useCallback(
    (pet: PetsList) => {
      const action = PetSelectSlice.actions.setPetInfo(pet);
      dispatch(action);
      bottomSheetModalRef.current?.close();
    },
    [dispatch],
  );

  const renderItems = useCallback(
    ({ item }: any) => {
      return (
        <Pressable onPress={() => handleSelectPet(item)} style={styles.petName}>
          <Text style={styles.petNameText}>{item.name}</Text>
        </Pressable>
      );
    },
    [handleSelectPet],
  );

  const onClickAddButton = useCallback(() => {
    navigation.navigate('Register');
    bottomSheetModalRef.current?.close();
  }, [navigation]);

  return (
    <>
      <View style={styles.toggleSection}>
        <Pressable
          onPress={handlePresentModalPress}
          style={styles.toggleButton}>
          <Text style={styles.name}>{name}</Text>
          <Arrow />
        </Pressable>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <BottomSheetView style={styles.bottomSheetContent}>
              <Text style={styles.sheetTitle}>아이 선택하기</Text>
              <FlatList
                data={petsList}
                renderItem={renderItems}
                keyExtractor={item => item.name}
                style={styles.nameWrap}
              />
              <Pressable onPress={onClickAddButton} style={styles.addButton}>
                <Plus />
                <Text style={styles.addButtonText}>추가하기</Text>
              </Pressable>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </View>
    </>
  );
};

export default PetToggle;

const styles = StyleSheet.create({
  toggleSection: {
    position: 'relative',
    zIndex: 10,
  },
  toggleButton: {
    position: 'absolute',
    left: 20,
    top: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    color: THEME.COLOR.BLACK_1,
    lineHeight: 24,
  },
  bottomSheetContent: {
    paddingTop: 14,
  },
  sheetTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  nameWrap: {
    marginBottom: 25,
    height: 182,
  },
  petName: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLOR.GRAY_3,
  },
  petNameText: {
    fontSize: 18,
    paddingVertical: 12,
    paddingLeft: 18,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 'auto',
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    borderRadius: 8,
    marginTop: 12,
    gap: 4,
    flexDirection: 'row',
  },
  addButtonText: {
    color: THEME.COLOR.ORANGE_1,
    fontSize: 16,
  },
});
