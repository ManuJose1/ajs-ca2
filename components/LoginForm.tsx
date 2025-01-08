import { Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import axios from "axios";
import { TextInput, Button, MD3DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { IAuthConext } from "@/types";

export default function LoginForm() {
    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const [error, setError] = useState()

    const {signIn} = useSession();
    const router = useRouter();

    const handleChange = (e:any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () => {
        console.log("Button Pressed!")
        axios.post(`https://ajs-ca1-carparts.vercel.app/api/users/login/`,{
          email: form.email,
          password: form.password
        })
             .then(response => {
                console.log(response.data.token)
                signIn(response.data.token);
                router.push('./(tabs)/(auth)/parts');
             })
             .catch(e => {
                console.log(e);
                setError(e.message)
                console.log(e.message)
                console.log(form)
             })
    }
  return (
    <PaperProvider>
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
    input:{

    }
})
