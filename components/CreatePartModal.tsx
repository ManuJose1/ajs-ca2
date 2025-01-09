import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import CreatePartForm from '@/components/CreatePartForm';
import { PartTypeID } from '@/types';

interface CreatePartModalProps {
  visible: boolean;
  hideModal: () => void;
  addPart: (newPart: PartTypeID) => void;
}

const CreatePartModal: React.FC<CreatePartModalProps> = ({ visible, hideModal, addPart }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <CreatePartForm addPart={addPart} hideModal={hideModal} />
      </Modal>
    </Portal>
  );
};

export default CreatePartModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});