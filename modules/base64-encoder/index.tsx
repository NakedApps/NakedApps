import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Base64Encoder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔤 Base64 Encoder</Text>
      <Text style={styles.subtitle}>Encode and decode Base64 strings</Text>
      <Text style={styles.description}>
        This module would encode and decode Base64 strings for data transmission and storage.
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

export default Base64Encoder;
