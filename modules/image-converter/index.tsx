import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImageConverter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖼️ Image Converter</Text>
      <Text style={styles.subtitle}>Convert images between different formats</Text>
      <Text style={styles.description}>
        This module would allow you to convert images between various formats including JPEG, PNG, WebP, and more.
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
    color: '#8b5cf6',
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

export default ImageConverter;
