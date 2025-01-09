import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import axios from "axios";
import { PartTypeID } from "@/types";
import { Picker } from "@react-native-picker/picker";

interface CreatePartFormProps {
  addPart: (newPart: PartTypeID) => void;
  hideModal: () => void;
}

export default function CreatePartForm({ addPart, hideModal }: CreatePartFormProps) {
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "", subcategory: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    axios
      .post(`https://ajs-ca1-carparts.vercel.app/api/parts`, {
        title: form.title,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        subcategory: form.subcategory,
      })
      .then((response) => {
        console.log(response.data);
        addPart(response.data);
        hideModal();
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to create part");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Part</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChangeText={(text) => handleChange("title", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={form.price}
        onChangeText={(text) => handleChange("price", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
      />
        <Picker
          selectedValue={form.category}
          onValueChange={(itemValue) => handleChange("category", itemValue)}
          style={styles.pickerContainer}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Engine" value="Engine" />
          <Picker.Item label="Transmission" value="Transmission" />
          <Picker.Item label="Brakes" value="Brakes" />
          <Picker.Item label="Suspension" value="Suspension" />
          <Picker.Item label="Electrical" value="Electrical" />
          <Picker.Item label="Service Parts" value="Service Parts" />
        </Picker>
      <TextInput
        style={styles.input}
        placeholder="Subcategory"
        value={form.subcategory}
        onChangeText={(text) => handleChange("subcategory", text)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleSubmit}>
        Create Part
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pickerContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});