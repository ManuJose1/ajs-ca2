import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Linking from 'expo-linking';
import { Link } from 'expo-router';

import { PartTypeID } from "@/types";

interface MyProps {
  part: PartTypeID;
}

export default function PartItem({ part }: MyProps) {
  return (
    <View style={styles.item}>
      <Link href={`/parts/${part._id}`}>
        <Text>{part.title}</Text>
      </Link>
    <Text>{part.price}</Text>
</View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#cfcfcf",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});