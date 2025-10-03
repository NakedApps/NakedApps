import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('0');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('0');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map(btn => (
            <TouchableOpacity key={btn} style={styles.button} onPress={() => handlePress(btn)}>
              <Text style={styles.buttonText}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  display: { fontSize: 48, textAlign: 'right', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  button: { backgroundColor: '#ddd', padding: 20, borderRadius: 10, flex: 1, margin: 5 },
  buttonText: { fontSize: 24, textAlign: 'center' },
});

export default Calculator;