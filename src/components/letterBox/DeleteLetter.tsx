import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Error from '../../assets/ic_modal_error.svg';
import { THEME } from '../../constants/theme';

type Props = {
  onClickDeleteButton: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

const DeleteLetter = ({ onClickDeleteButton, setIsModalOpen }: Props) => {
  return (
    <View style={styles.modal}>
      <Error />
      <Text style={styles.title}>삭제하시겠습니까?</Text>
      <Text style={styles.warning}>삭제한 편지는 되돌릴 수 없어요.</Text>
      <View style={styles.btnWrap}>
        <Pressable onPress={() => setIsModalOpen(false)} style={styles.backBtn}>
          <Text style={styles.backBtnText}>돌아가기</Text>
        </Pressable>
        <Pressable onPress={onClickDeleteButton} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>편지 삭제하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeleteLetter;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 42,
    paddingVertical: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  warning: {
    marginTop: 14,
    fontSize: 16,
    color: THEME.COLOR.RED_3,
  },
  btnWrap: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 12,
  },
  backBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: THEME.COLOR.GRAY_9,
    borderRadius: 8,
  },
  backBtnText: {
    color: THEME.COLOR.GRAY_10,
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: THEME.COLOR.ORANGE_1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: THEME.COLOR.WHITE,
    fontSize: 16,
  },
});
