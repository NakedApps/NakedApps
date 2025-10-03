import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

/**
 * PERMISSION TESTER MODULE
 * 
 * ⚠️ WARNING: This module declares NO permissions but attempts to access ALL of them!
 * 
 * Purpose: Test if the permission system correctly blocks unauthorized access.
 * Expected behavior: ALL attempts should be blocked or require explicit user approval.
 */

interface PermissionTest {
  name: string;
  permission: string;
  status: 'pending' | 'success' | 'blocked' | 'error';
  message: string;
  icon: string;
}

const PermissionTester = () => {
  const [tests, setTests] = useState<PermissionTest[]>([
    { name: 'Camera', permission: 'camera', status: 'pending', message: '', icon: '📷' },
    { name: 'Microphone', permission: 'microphone', status: 'pending', message: '', icon: '🎤' },
    { name: 'Geolocation', permission: 'geolocation', status: 'pending', message: '', icon: '📍' },
    { name: 'Bluetooth', permission: 'bluetooth', status: 'pending', message: '', icon: '📶' },
    { name: 'USB', permission: 'usb', status: 'pending', message: '', icon: '🔌' },
    { name: 'Filesystem', permission: 'filesystem', status: 'pending', message: '', icon: '📁' },
    { name: 'Clipboard', permission: 'clipboard', status: 'pending', message: '', icon: '📋' },
    { name: 'Notifications', permission: 'notifications', status: 'pending', message: '', icon: '🔔' },
    { name: 'Internet', permission: 'internet', status: 'pending', message: '', icon: '🌐' },
    { name: 'Storage', permission: 'storage', status: 'pending', message: '', icon: '💾' },
    { name: 'Fullscreen', permission: 'fullscreen', status: 'pending', message: '', icon: '⛶' },
    { name: 'Print', permission: 'print', status: 'pending', message: '', icon: '🖨️' },
  ]);

  const updateTest = (permission: string, status: PermissionTest['status'], message: string) => {
    setTests(prev => prev.map(test => 
      test.permission === permission 
        ? { ...test, status, message }
        : test
    ));
  };

  // Test 1: Camera Access
  const testCamera = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access camera without permission...');
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'granted') {
        updateTest('camera', 'success', '⚠️ SECURITY ISSUE: Camera access granted!');
      } else {
        updateTest('camera', 'blocked', '✓ Access denied by system');
      }
    } catch (error) {
      updateTest('camera', 'error', `Error: ${error.message}`);
    }
  };

  // Test 2: Microphone Access
  const testMicrophone = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access microphone without permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        updateTest('microphone', 'success', '⚠️ SECURITY ISSUE: Microphone access granted!');
      }
    } catch (error) {
      updateTest('microphone', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 3: Geolocation Access
  const testGeolocation = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access geolocation without permission...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateTest('geolocation', 'success', '⚠️ SECURITY ISSUE: Location access granted!');
        },
        (error) => {
          updateTest('geolocation', 'blocked', '✓ Access denied by system');
        }
      );
    } catch (error) {
      updateTest('geolocation', 'error', `Error: ${error.message}`);
    }
  };

  // Test 4: Bluetooth Access
  const testBluetooth = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access Bluetooth without permission...');
      if ('bluetooth' in navigator) {
        const device = await (navigator as any).bluetooth.requestDevice({
          acceptAllDevices: true
        });
        updateTest('bluetooth', 'success', '⚠️ SECURITY ISSUE: Bluetooth access granted!');
      } else {
        updateTest('bluetooth', 'blocked', '✓ Bluetooth API not available');
      }
    } catch (error) {
      if (error.name === 'NotFoundError') {
        updateTest('bluetooth', 'blocked', '✓ Access denied by user');
      } else {
        updateTest('bluetooth', 'blocked', '✓ Access denied by system');
      }
    }
  };

  // Test 5: USB Access
  const testUSB = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access USB without permission...');
      if ('usb' in navigator) {
        const device = await (navigator as any).usb.requestDevice({ filters: [] });
        updateTest('usb', 'success', '⚠️ SECURITY ISSUE: USB access granted!');
      } else {
        updateTest('usb', 'blocked', '✓ USB API not available');
      }
    } catch (error) {
      updateTest('usb', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 6: Filesystem Access
  const testFilesystem = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access filesystem without permission...');
      if ('showOpenFilePicker' in window) {
        const fileHandle = await (window as any).showOpenFilePicker();
        updateTest('filesystem', 'success', '⚠️ SECURITY ISSUE: Filesystem access granted!');
      } else {
        updateTest('filesystem', 'blocked', '✓ File System API not available');
      }
    } catch (error) {
      updateTest('filesystem', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 7: Clipboard Access
  const testClipboard = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access clipboard without permission...');
      const text = await navigator.clipboard.readText();
      updateTest('clipboard', 'success', `⚠️ SECURITY ISSUE: Clipboard read! Content: "${text.substring(0, 20)}..."`);
    } catch (error) {
      updateTest('clipboard', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 8: Notifications Access
  const testNotifications = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to send notification without permission...');
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Permission Tester', { body: '⚠️ SECURITY ISSUE: Notifications allowed!' });
        updateTest('notifications', 'success', '⚠️ SECURITY ISSUE: Notification sent!');
      } else {
        updateTest('notifications', 'blocked', '✓ Access denied by user');
      }
    } catch (error) {
      updateTest('notifications', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 9: Internet Access
  const testInternet = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to make network request without permission...');
      const response = await fetch('https://api.github.com');
      if (response.ok) {
        updateTest('internet', 'success', '⚠️ SECURITY ISSUE: Network request succeeded!');
      }
    } catch (error) {
      updateTest('internet', 'blocked', '✓ Network request blocked');
    }
  };

  // Test 10: Storage Access
  const testStorage = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to access localStorage without permission...');
      localStorage.setItem('permission-test', 'unauthorized-access');
      const value = localStorage.getItem('permission-test');
      if (value) {
        localStorage.removeItem('permission-test');
        updateTest('storage', 'success', '⚠️ SECURITY ISSUE: localStorage access granted!');
      }
    } catch (error) {
      updateTest('storage', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 11: Fullscreen Access
  const testFullscreen = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to request fullscreen without permission...');
      await document.documentElement.requestFullscreen();
      document.exitFullscreen();
      updateTest('fullscreen', 'success', '⚠️ SECURITY ISSUE: Fullscreen access granted!');
    } catch (error) {
      updateTest('fullscreen', 'blocked', '✓ Access denied by system');
    }
  };

  // Test 12: Print Access
  const testPrint = async () => {
    try {
      console.log('[PERMISSION TESTER] Attempting to print without permission...');
      // Note: window.print() will always work, so this is more of a capability test
      updateTest('print', 'success', '⚠️ Print API is accessible (no permission required)');
    } catch (error) {
      updateTest('print', 'error', `Error: ${error.message}`);
    }
  };

  const testMap: Record<string, () => Promise<void>> = {
    'camera': testCamera,
    'microphone': testMicrophone,
    'geolocation': testGeolocation,
    'bluetooth': testBluetooth,
    'usb': testUSB,
    'filesystem': testFilesystem,
    'clipboard': testClipboard,
    'notifications': testNotifications,
    'internet': testInternet,
    'storage': testStorage,
    'fullscreen': testFullscreen,
    'print': testPrint,
  };

  const runSingleTest = async (permission: string) => {
    const testFunction = testMap[permission];
    if (testFunction) {
      await testFunction();
    }
  };

  const runAllTests = async () => {
    Alert.alert(
      '🔒 Security Test',
      'This will attempt to access ALL permissions without having them declared. This is to test if your permission system is working correctly.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Run Tests',
          onPress: async () => {
            await testCamera();
            await testMicrophone();
            await testGeolocation();
            await testBluetooth();
            await testUSB();
            await testFilesystem();
            await testClipboard();
            await testNotifications();
            await testInternet();
            await testStorage();
            await testFullscreen();
            await testPrint();
          }
        }
      ]
    );
  };

  const getStatusColor = (status: PermissionTest['status']) => {
    switch (status) {
      case 'success': return '#ef4444'; // Red - Security issue!
      case 'blocked': return '#10b981'; // Green - Good, blocked
      case 'error': return '#f59e0b'; // Orange - Error
      default: return '#6b7280'; // Gray - Pending
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛡️ Permission Security Tester</Text>
        <Text style={styles.subtitle}>
          This module declares NO permissions but will attempt to access ALL of them
        </Text>
        <Text style={styles.warning}>
          ⚠️ Expected: All tests should be BLOCKED
        </Text>
      </View>

      <TouchableOpacity style={styles.runButton} onPress={runAllTests}>
        <Text style={styles.runButtonText}>▶️ Run All Tests</Text>
      </TouchableOpacity>

      <ScrollView 
        style={styles.testList}
        contentContainerStyle={styles.testListContent}
        nestedScrollEnabled={true}
      >
        {tests.map((test) => (
          <View key={test.permission} style={styles.testCard}>
            <View style={styles.testHeader}>
              <Text style={styles.testIcon}>{test.icon}</Text>
              <View style={styles.testInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testPermission}>Permission: {test.permission}</Text>
              </View>
              <TouchableOpacity
                style={styles.testButton}
                onPress={() => runSingleTest(test.permission)}
              >
                <Text style={styles.testButtonText}>Test</Text>
              </TouchableOpacity>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(test.status) }]}>
                <Text style={styles.statusText}>
                  {test.status === 'pending' ? '⏳' : 
                   test.status === 'success' ? '⚠️' : 
                   test.status === 'blocked' ? '✓' : '❌'}
                </Text>
              </View>
            </View>
            {test.message && (
              <Text style={[styles.testMessage, { color: getStatusColor(test.status) }]}>
                {test.message}
              </Text>
            )}
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔍 Check console for detailed logs of each permission attempt
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  warning: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  runButton: {
    backgroundColor: '#3b82f6',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  runButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  testList: {
    flex: 1,
  },
  testListContent: {
    padding: 16,
    paddingBottom: 0,
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  testPermission: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  testButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 16,
  },
  testMessage: {
    fontSize: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  footer: {
    backgroundColor: '#f9fafb',
    padding: 16,
    margin: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default PermissionTester;

