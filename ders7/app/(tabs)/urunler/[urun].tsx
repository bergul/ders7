import { View, Text, StyleSheet, Image
 } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useGlobalSearchParams, useSearchParams } from 'expo-router/build/hooks'

const index = () => {
  const searchParams = useSearchParams();
  const product = searchParams.get('urun');
  const [veri, setVeri] = useState({});
  useEffect(() => {

    axios.get(`https://dummyjson.com/products/${product}`)
      .then(res => {
        const data = res.data;
        setVeri(data);
      })


  }, [veri]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text>{veri.title}</Text>
      <Image source={{ uri: veri.thumbnail }} style={{ width: '100%', height: 300 }} />
      <View style={{ flexDirection: 'row' }}>
        <Text>{veri.price}</Text>
        <Text>{veri.discountPercentage}</Text>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({

})    
