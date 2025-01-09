import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import RegisterForm from '@/components/RegisterForm';
import { RegisterModalProps } from '@/types';

const RegisterModal: React.FC<RegisterModalProps> = ({ visible, hideModal, showLoginModal }) => {
  const handleLogin = () => {
    hideModal();
    showLoginModal();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>Register</Text>
        <RegisterForm />
        <Text style={styles.text}>Already have an account? Login here.</Text>
        <Button mode="outlined" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Button mode="contained" onPress={hideModal} style={styles.button}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: '#000'
  },
  button: {
    marginTop: 10,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    color: '#000'
  },
});