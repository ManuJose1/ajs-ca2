import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useCart } from '@/contexts/CartContext';
import { Button, Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { PartTypeID } from '@/types';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const renderItem: ListRenderItem<PartTypeID> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>€ {item.price}</Text>
      <Button mode="contained" onPress={() => removeFromCart(item._id)}>
        Remove
      </Button>
    </View>
  );

  const handleCheckout = () => {
    console.log('Checkout button pressed');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Cart</Text>
        {cart.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
        {cart.length > 0 && (
          <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={clearCart} style={styles.clearButton} labelStyle={styles.buttonText}>
            Clear Cart
          </Button>
          <Button mode="contained" onPress={handleCheckout} style={styles.checkoutButton} labelStyle={styles.buttonText}>
            Checkout
          </Button>
        </View>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#a50b0b',
  },
  checkoutButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#23840b',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});