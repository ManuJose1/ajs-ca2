import { Text, TextInput, StyleSheet, Button } from "react-native";
import { ChangeEvent, useState } from "react";
import { useSession } from "@/contexts/AuthContext";
import axios from "axios";
import { IAuthConext } from "@/types";

export default function LoginForm() {
    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const [error, setError] = useState()

    const {signIn} = useSession();

    const handleChange = (e:any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () => {
        console.log("Button Pressed!")
        axios.post('ajs-ca1-carparts.vercel.app/api/users/login', {
            email:form.email,
            password:form.password
        })
             .then(response => {
                console.log(response.data.token)
                signIn(response.data.token);
             })
             .catch(e => {
                console.log(e);
                setError(e.response.data.message)
             })
    }
  return (
    <>
      <Text>This is the login page</Text>
      <TextInput
        placeholder="email"
        value={form.email}
        onChange={handleChange}
        id="email"
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={form.password}
        onChange={handleChange}
        id="password"
        style={styles.input}
      />

      <Text>{error}</Text>

      <Button
        onPress={handlePress}
        title="submit"
        color="blue"
      />
    </>
  );
}

const styles = StyleSheet.create({
    input:{

    }
})
