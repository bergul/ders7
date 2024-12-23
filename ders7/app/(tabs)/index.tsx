import { Image, StyleSheet, Platform ,TextInput,View,Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const [fiyat, setFiyat] = useState('');

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
        style={styles.input}
        placeholder="Fiyat Giriniz"
        keyboardType='numeric'
        onChangeText={hesapla}
        value={fiyat}
      />
      <Text style={styles.result}>{calculatePercentage(fiyat)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    paddingTop: 50,

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 18,
  },
});