import { View, Text, StyleSheet, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useGlobalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth } = Dimensions.get('window');

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color={i <= rating ? 'gold' : 'gray'}
        />
      );
    }
    return stars;
  };

  if (!veri || !veri.images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{veri.title}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {veri.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <Text style={{fontSize:24,fontWeight:900}}>
        {(veri.price - (veri.price * veri.discountPercentage) / 100).toFixed(2)}
      </Text>
      <Text style={{textDecorationLine:'line-through'}}>
        {veri.price}
      </Text>
      <Text style={styles.description}>{veri.description}</Text>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.title}>Reviews</Text> 
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.reviewerEmail}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <View style={styles.starsContainer}>
              {renderStars(item.rating)}
            </View>
            <Text style={styles.reviewText}>{item.comment}</Text>
            <Text style={styles.reviewText}>{item.reviewerName}</Text>
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
  scrollView: {
    marginVertical: 16,
  },
  image: {
    width: viewportWidth,
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
  starsContainer: {
    flexDirection: 'row',
  },
});

export default index;
