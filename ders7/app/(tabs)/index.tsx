import { Image, StyleSheet, Platform, TextInput, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [fiyat, setFiyat] = useState('');
  const [isNegative, setIsNegative] = useState(false);

  useEffect(() => {
    setIsNegative(parseFloat(fiyat) < 0);
  }, [fiyat]);

  const hesapla = (text: string) => {
    setFiyat(text);
  };

  const calculatePercentage = (input: string) => {
    const number = parseFloat(input);
    if (isNaN(number)) return '';
    return (number * 1.2).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isNegative && styles.inputNegative]}
        placeholder="Fiyat Giriniz"
        keyboardType='numeric'
        onChangeText={hesapla}
        value={fiyat}
      />
      <Text>%20 Fazlası: {calculatePercentage(fiyat)}</Text>
      <Link href="/(tabs)/urunler/1">Git</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  inputNegative: {
    borderColor: 'red',
  },
});