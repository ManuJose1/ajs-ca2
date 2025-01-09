import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import axios from "axios";
import {
  TextInput,
  Button,
  Text,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const { signIn } = useSession();
  const [error, setError] = useState<string | undefined>();

  const handleChange = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePress = () => {
    console.log("Button Pressed!");
    axios
      .post(`https://ajs-ca1-carparts.vercel.app/api/users/register/`, {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data.token);
        signIn(response.data.token);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        console.log(e.message);
        console.log(form);
      });
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          label="Full Name"
          value={form.full_name}
          onChangeText={(text) => handleChange("full_name", text)}
          style={styles.input}
          mode="outlined"
          theme={DefaultTheme}
        />
        <TextInput
          label="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          style={styles.input}
          mode="outlined"
          theme={DefaultTheme}
        />
        <TextInput
          label="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={DefaultTheme}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button mode="contained" onPress={handlePress} style={styles.button}>
          Register
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});