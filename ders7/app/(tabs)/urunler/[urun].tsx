import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useGlobalSearchParams, useSearchParams } from 'expo-router/build/hooks'

const index = () => {
  const searchParams = useSearchParams();
  const product = searchParams.get('urun');
  const [veri, setVeri] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${product}`)
      .then(res => {
        const data = res.data;
        setVeri(data);
        setReviews(data.reviews); // Store the reviews array in state
      })
  }, [product]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{veri.title}</Text>
      <Image source={{ uri: veri.thumbnail }} style={styles.image} />
      <Text style={{fontSize:24,fontWeight:900}}>{(veri.price-(veri.price*veri.discountPercentage)/100).toFixed(2)}</Text>
      <Text style={{textDecorationLine:'line-through'}}>{veri.price}</Text>
      <Text style={styles.description}>{veri.description}</Text>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.title}>Reviews</Text> 
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.reviewerEmail}
        renderItem={({ item }) => (
          <View style={styles.review}>
             <Text style={styles.reviewText}>{item.rating}</Text>
            <Text style={styles.reviewText}>{item.comment}</Text>
            <Text style={styles.reviewText}>{item.reviewerName}</Text>
            <Text style={styles.reviewText}>{item.reviewerEmail}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  review: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reviewText: {
    fontSize: 14,
  },
});

export default index;
