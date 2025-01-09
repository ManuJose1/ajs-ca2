import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import PartItem from '@/components/PartItem';
import { PartTypeID } from '@/types';
import CreatePartModal from '@/components/CreatePartModal';
import { Picker } from '@react-native-picker/picker';

export default function Tab() {
  const [parts, setParts] = useState<PartTypeID[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createVisible, setCreateVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    axios.get(`https://ajs-ca1-carparts.vercel.app/api/parts`)
      .then(response => {
        console.log(response.data);
        setParts(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError('Failed to fetch parts');
        setLoading(false);
      });
  }, []);

  const showCreateModal = () => setCreateVisible(true);
  const hideCreateModal = () => setCreateVisible(false);

  const addPart = (newPart: PartTypeID) => {
    setParts(prevParts => [...prevParts, newPart]);
  };

  const filteredParts = selectedCategory
    ? parts.filter(part => part.category === selectedCategory)
    : parts;

  if (loading) {
    return (
      <PaperProvider theme={PaperDarkTheme}>
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
      <PaperProvider theme={PaperDarkTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Text>{error}</Text>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={PaperDarkTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.pickerContainer}
          >
            <Picker.Item label="All Categories" value="" />
            <Picker.Item label="Engine" value="Engine" />
            <Picker.Item label="Transmission" value="Transmission" />
            <Picker.Item label="Brakes" value="Brakes" />
            <Picker.Item label="Suspension" value="Suspension" />
            <Picker.Item label="Electrical" value="Electrical" />
            <Picker.Item label="Service Parts" value="Service Parts" />
          </Picker>
          <FlatList
            data={filteredParts}
            renderItem={({ item }) => <PartItem part={item} />}
            keyExtractor={(part: PartTypeID) => part._id}
          />
          <Button mode="contained" onPress={showCreateModal} style={styles.button}>
            Create Part
          </Button>
          <CreatePartModal visible={createVisible} hideModal={hideCreateModal} addPart={addPart} />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  text: {
    marginBottom: 20,
  },
  pickerContainer: {

    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});