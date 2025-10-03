import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorPicker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 Color Picker</Text>
      <Text style={styles.subtitle}>Pick colors and generate color palettes</Text>
      <Text style={styles.description}>
        This module would allow you to pick colors from anywhere on your screen and generate beautiful color palettes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default ColorPicker;
