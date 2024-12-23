import { Image, StyleSheet, Platform ,TextInput,View,Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
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
        placeholder="Enter a number"
        keyboardType="numeric"
        onChangeText={handleChange}
        value={value}
      />
      <Text style={styles.result}>{calculatePercentage(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding: 16,
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