import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  visible: boolean;
  children: React.ReactNode;
  handleModal: (isOpen: boolean) => void;
};

const ModalContainer = ({ visible, children, handleModal }: Props) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => handleModal(false)}>
        <View style={styles.container}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
