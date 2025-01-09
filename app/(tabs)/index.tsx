import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { useSession } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

export default function HomePage() {
  const { session, signOut } = useSession();
  const router = useRouter();
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const showLoginModal = () => setLoginVisible(true);
  const hideLoginModal = () => setLoginVisible(false);

  const showRegisterModal = () => setRegisterVisible(true);
  const hideRegisterModal = () => setRegisterVisible(false);

  useEffect(() => {
    if (session) {
      router.push("/parts");
    } else {
      showLoginModal();
    }
  }, [session]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Home Page</Text>
        <LoginModal
          visible={loginVisible}
          hideModal={hideLoginModal}
          showRegisterModal={showRegisterModal}
        />
        <RegisterModal
          visible={registerVisible}
          hideModal={hideRegisterModal}
          showLoginModal={showLoginModal}
        />
        {!session ? (
          <View>
            <Button
              mode="contained"
              onPress={showLoginModal}
              style={styles.button}
            >
              Login
            </Button>
            <Button
              mode="contained"
              onPress={showRegisterModal}
              style={styles.button}
            >
              Register
            </Button>
          </View>
        ) : (
          <Button mode="contained" onPress={signOut} style={styles.button}>
            Logout
          </Button>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});
