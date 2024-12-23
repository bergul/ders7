import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'

const index = () => {
  const {product}=useLocalSearchParams();
  const [veri, setVeri] = useState('');
  useEffect(() => {

    axios.get(`https://dummyjson.com/products/${product}`)
      .then(res => {
        const data = res.data;
        setVeri(data);
      })  


  }, [product]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <Text>{JSON.stringify(veri)}</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({

})    
