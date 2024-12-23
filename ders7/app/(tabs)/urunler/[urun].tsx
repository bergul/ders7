import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const index = () => {
  const product=useLocalSearchParams()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <Text>{product}</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({

})    
