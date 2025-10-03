import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PDFDocument } from 'pdf-lib';

const PDFModifier = () => {
  const [text, setText] = useState('');

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: 50,
      y: height - 100,
      size: 12,
    });
    const pdfBytes = await pdfDoc.save();
    // In a real app, save to file system
    Alert.alert('PDF Generated', `PDF with ${pdfBytes.length} bytes created (not saved)`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDF Modifier</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter text to add to PDF"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Generate PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, height: 200, textAlignVertical: 'top', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 },
});

export default PDFModifier;