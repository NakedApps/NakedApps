import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BarcodeScanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Barcode Scanner</Text>
      <Text style={styles.subtitle}>Scan various barcode formats</Text>
      <Text style={styles.description}>
        This module would scan and decode various barcode formats including QR codes, UPC, EAN, and more using your camera.
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
    color: '#84cc16',
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

export default BarcodeScanner;
