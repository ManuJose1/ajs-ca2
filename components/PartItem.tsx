import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { PartTypeID } from "@/types";

interface MyProps {
  part: PartTypeID;
}

export default function PartItem({ part }: MyProps) {
  return (
    <TouchableOpacity style={styles.item}>
      <Link href={`/parts/${part._id}`} style={styles.link}>
      <View>
          <Text style={styles.title}>{part.title}</Text>
          <Text style={styles.price}>€ {part.price}</Text>
        </View>
      </Link>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  link: {
    textDecorationLine: 'none',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});