import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | undefined>();
  const { signIn } = useSession();
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePress = () => {
    axios.post(`https://ajs-ca1-carparts.vercel.app/api/users/login/`, {
      email: form.email,
      password: form.password,
    })
      .then(response => {
        signIn(response.data.token);
        router.push('/parts');
      })
      .catch(e => {
        setError(e.message);
      });
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          style={styles.input}
          mode="outlined"
          theme={DefaultTheme}
        />
        <TextInput
          label="Password"
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          theme={DefaultTheme}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button mode="contained" onPress={handlePress} style={styles.button}>
          Login
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