import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UnitConverter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📏 Unit Converter</Text>
      <Text style={styles.subtitle}>Convert between different units of measurement</Text>
      <Text style={styles.description}>
        This module would convert between various units of length, weight, temperature, area, volume, and more with high precision.
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
    color: '#f97316',
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

export default UnitConverter;
