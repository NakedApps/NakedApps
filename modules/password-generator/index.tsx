import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PasswordGenerator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Password Generator</Text>
      <Text style={styles.subtitle}>Generate secure passwords and passphrases</Text>
      <Text style={styles.description}>
        This module would generate cryptographically secure passwords and memorable passphrases with customizable options.
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
    color: '#ef4444',
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

export default PasswordGenerator;
