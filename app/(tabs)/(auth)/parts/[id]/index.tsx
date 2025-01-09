import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { PartTypeID } from '@/types';
import { Button, Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { useCart } from '@/contexts/CartContext';
import EditPartModal from '@/components/EditPartModal';

export default function PartDetails() {
  const [part, setPart] = useState<PartTypeID | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editVisible, setEditVisible] = useState(false);
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      axios.get(`https://ajs-ca1-carparts.vercel.app/api/parts/${id}`)
        .then(response => {
          if (response.data && !response.data.message) {
            console.log(response.data);
            setPart(response.data);
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

  const showEditModal = () => setEditVisible(true); 
  const hideEditModal = () => setEditVisible(false); 

  const updatePartDetails = (updatedPart: PartTypeID) => { 
    setPart(updatedPart);
  };

  const handleDelete = () => {
    axios.delete(`https://ajs-ca1-carparts.vercel.app/api/parts/${id}`)
      .then(() => {
        router.push('/parts');
      })
      .catch(e => {
        console.log(e);
        setError('Failed to delete part');
      });
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

  if (!part) {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Text>No part found</Text>
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  const handleAddToCart = () => {
    addToCart(part);
  };

  const handleBack = () => {
    router.push('/parts');
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{part.title}</Text>
          <Text style={styles.price}>€ {part.price}</Text>
          <Text style={styles.description}>{part.description}</Text>
          <Button mode="contained" onPress={handleAddToCart}>
            Add to Cart
          </Button>
          <Button mode="outlined" onPress={showEditModal} style={styles.button}>
            Edit Part
          </Button>
          <Button mode="outlined" onPress={handleBack} style={styles.button}>
            Back to Parts
          </Button>
          <Button mode="contained" onPress={handleDelete} style={styles.deleteButton}>
            Delete Part
          </Button>
          <EditPartModal visible={editVisible} hideModal={hideEditModal} updatePartDetails={updatePartDetails} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
  },
});