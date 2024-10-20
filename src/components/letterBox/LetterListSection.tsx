import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { format, getDay } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';
import ThickDivider from '../home/ThickDivider';
import LetterItem from './LetterItem';
import { Letters } from '../../model/Letter.model';
import { RootState } from '../../store/reducer';
import { formatDay } from '../../utils/date';
import { THEME } from '../../constants/theme';
import { deleteLetter, getLetterList } from '../../api/letter';
import Plus from '../../assets/ic_letterBox_plus.svg';
import LetterItemForDelete from './LetterItemForDelete';
import DeleteLetter from './DeleteLetter';
import ModalContainer from '../common/ModalContainer';

type Props = {
  date: Date;
  letterList: Letters[];
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
  setLetterList: (letter: any) => void;
};

const LetterListSection = ({
  date,
  letterList,
  setIsEditing,
  isEditing,
  setLetterList,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const pet = useSelector((state: RootState) => state.petSelect);
  const { token } = useSelector((state: RootState) => state.account);
  const [filteredLetterListByPet, setFilteredLetterLisByPet] = useState<
    Letters[]
  >([]);
  const [selectedLetterList, setSelectedLetterList] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const filteredListByPet = letterList.filter(
      letter => letter.petName === pet.name,
    );

    setFilteredLetterLisByPet(filteredListByPet || []);
  }, [pet, letterList]);

  useEffect(() => {
    if (!isEditing) {
      setSelectedLetterList([]);
    }
  }, [isEditing]);

  const filteredListByDate = filteredLetterListByPet.filter(
    letter =>
      format(letter.createdAt, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  );

  const formattedDay = formatDay(getDay(date));
  const dateAndDay = `${format(date, 'M월 dd일')} ${formattedDay}요일`;

  const isToday = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === format(date, 'yyyy-MM-dd');
  }, [date]);

  const onClickWriteLetterButton = useCallback(() => {
    navigation.navigate('WriteLetter', { id: pet?.id });
  }, [navigation, pet?.id]);

  const onClickEditButton = useCallback(() => {
    setIsEditing(!isEditing);
  }, [setIsEditing, isEditing]);

  const handleLocalModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleLetterCheck = useCallback(
    (id: number) => {
      if (selectedLetterList.includes(id)) {
        return setSelectedLetterList(
          selectedLetterList.filter(item => item !== id),
        );
      }

      return setSelectedLetterList(prev => [...prev, id]);
    },
    [selectedLetterList],
  );

  const onClickDeleteButton = useCallback(async () => {
    try {
      for (const letter of selectedLetterList) {
        await deleteLetter(token, letter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      const {
        data: { letters },
      } = await getLetterList(token, pet?.id);
      setLetterList(letters || []);
      setSelectedLetterList([]);
      setIsModalOpen(false);
      setIsEditing(false);
    }
  }, [pet?.id, token, selectedLetterList, setIsEditing, setLetterList]);

  const isSelectLetterItem = selectedLetterList.length > 0;
  const isExistTodayLetter = filteredListByDate.length > 0;

  return (
    <>
      <ThickDivider />
      <View style={styles.section}>
        {isEditing && !isSelectLetterItem && (
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>
              아래 편지를 눌러{'\n'}
              삭제할 편지를 선택할 수 있어요!
            </Text>
            <View style={styles.tooltipArrow} />
          </View>
        )}
        <View style={styles.header}>
          <Text style={styles.today}>{dateAndDay}</Text>
          <Pressable
            disabled={!isExistTodayLetter}
            style={styles.deleteButton}
            onPress={
              !isSelectLetterItem ? onClickEditButton : handleLocalModal
            }>
            <Text style={styles.deleteButtonText}>
              {!isEditing ? '편집' : isSelectLetterItem ? '삭제' : '취소'}
            </Text>
          </Pressable>
        </View>
        {isEditing
          ? filteredListByDate.map(letter => (
              <LetterItemForDelete
                letter={letter}
                handleLetterCheck={handleLetterCheck}
                isSelect={selectedLetterList.includes(letter.id)}
              />
            ))
          : filteredListByDate.map(letter => <LetterItem letter={letter} />)}
        {isToday && (
          <Pressable
            onPress={onClickWriteLetterButton}
            style={styles.addButton}>
            <Plus />
            <Text style={styles.addButtonText}>편지 쓰기</Text>
          </Pressable>
        )}
        <ModalContainer visible={isModalOpen} handleModal={setIsModalOpen}>
          <DeleteLetter
            onClickDeleteButton={onClickDeleteButton}
            setIsModalOpen={setIsModalOpen}
          />
        </ModalContainer>
      </View>
    </>
  );
};

export default LetterListSection;

const styles = StyleSheet.create({
  section: {
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 68,
  },
  today: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: THEME.COLOR.BLACK_1,
  },
  addButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: THEME.COLOR.ORANGE_1,
    borderRadius: 16,
  },
  addButtonText: {
    color: THEME.COLOR.ORANGE_1,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: THEME.COLOR.GRAY_4,
  },
  deleteButtonText: {
    color: THEME.COLOR.GRAY_4,
    lineHeight: 18,
  },
  tooltipContainer: {
    position: 'absolute',
    right: 60,
    top: 46,
    zIndex: 9999,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FB923C',
    opacity: 1,
  },
  tooltipText: {
    fontSize: 12,
    textAlign: 'center',
    color: THEME.COLOR.BLACK_1,
    lineHeight: 16,
  },
  tooltipArrow: {
    position: 'absolute',
    left: '50%',
    top: 44,
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#FB923C',
    transform: [{ rotate: '225deg' }],
  },
});
