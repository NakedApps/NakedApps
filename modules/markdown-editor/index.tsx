import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarkdownEditor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Markdown Editor</Text>
      <Text style={styles.subtitle}>Write and preview Markdown documents</Text>
      <Text style={styles.description}>
        This module would provide a full-featured Markdown editor with live preview, syntax highlighting, and export capabilities.
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
    color: '#6366f1',
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

export default MarkdownEditor;
