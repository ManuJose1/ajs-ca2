import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { PartTypeID, EditPartModalProps} from '@/types';
import { Modal, Portal, Text, Button, ActivityIndicator, Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

export default function EditPartModal({ visible, hideModal, updatePartDetails }: EditPartModalProps) {
  const [part, setPart] = useState<PartTypeID | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', price: '', description: '' });
  const { id } = useLocalSearchParams();


  //Fetch the part details based on the id from the API when the page opens
  useEffect(() => {
    if (id) {
      axios.get(`https://ajs-ca1-carparts.vercel.app/api/parts/${id}`)
        .then(response => {
          if (response.data && !response.data.message) {
            setPart(response.data);
            setForm({
              title: response.data.title,
              price: response.data.price.toString(),
              description: response.data.description,
            });
            setError(null);
          } else {
            setError('Part not found');
          }
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setError('Part not found');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (name: string, value: string) => {
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  //Send put request to update the part and hide modal
  const handleSubmit = () => {
    if (part) {
      axios.put(`https://ajs-ca1-carparts.vercel.app/api/parts/${id}`, {
        title: form.title,
        price: parseFloat(form.price),
        description: form.description,
      })
        .then(response => {
          console.log(response.data);
          updatePartDetails(response.data);
          hideModal();
        })
        .catch(e => {
          console.log(e);
          setError('Failed to update part');
        });
    }
  };

  if (loading) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  if (error) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Text>{error}</Text>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>Edit Part</Text>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={form.title}
          onChangeText={text => handleChange('title', text)}
        />
        <Text>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={form.price}
          onChangeText={text => handleChange('price', text)}
          keyboardType="numeric"
        />
        <Text>Desciption</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChangeText={text => handleChange('description', text)}
        />
        <Button mode="contained" onPress={handleSubmit}>
          Update Part
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});