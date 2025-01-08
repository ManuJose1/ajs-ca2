import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import PartItem from '@/components/PartItem';
import { PartType, PartTypeID } from '@/types';

export default function Tab() {
const [parts, setParts] = useState([]);
const { id } = useLocalSearchParams();

useEffect(()=>{
  axios.get(`https://ajs-ca1-carparts.vercel.app/api/parts`)
       .then(response => {
        console.log(response.data);
        setParts(response.data);
       })
       .catch(e => {
        console.log(e)
       })
}, []);

if(parts.length === 0) return <Text style={styles.text}>Part Not Available</Text>

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList 
        data={parts}
        renderItem={({item}) => <PartItem part={item}/>}
        keyExtractor={(part:PartTypeID) => part._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom:20
  }
});