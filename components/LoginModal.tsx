import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import LoginForm from "@/components/LoginForm";
import { LoginModalProps } from "@/types";

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  hideModal,
  showRegisterModal,
}) => {
  const handleRegister = () => {
    hideModal();
    showRegisterModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <LoginForm />
        <Text style={styles.text}>Don't have an account? Register here.</Text>
        <Button mode="outlined" onPress={handleRegister} style={styles.button}>
          Register
        </Button>
        <Button mode="contained" onPress={hideModal} style={styles.button}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
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
