import { Text, StyleSheet } from "react-native";
import { ChangeEvent, useState } from "react";
import { useSession } from "@/contexts/AuthContext";
import axios from "axios";
import {
  TextInput,
  Button,
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { IAuthConext } from "@/types";

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const {signIn} = useSession();

  const [error, setError] = useState()

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
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
    <PaperProvider>
      <TextInput
        placeholder="Full Name"
        label="Full Name"
        value={form.full_name}
        onChange={handleChange}
        id="full_name"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        id="email"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        label="Password"
        value={form.password}
        onChange={handleChange}
        id="password"
        style={styles.input}
      />
      <Text>{error}</Text>

      <Button onPress={handlePress} mode="contained">
        Submit
      </Button>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  input: {},
});
