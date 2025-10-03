import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const URLShortener = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 URL Shortener</Text>
      <Text style={styles.subtitle}>Shorten long URLs for easy sharing</Text>
      <Text style={styles.description}>
        This module would shorten long URLs using various URL shortening services and manage your shortened links.
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
    color: '#06b6d4',
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

export default URLShortener;
