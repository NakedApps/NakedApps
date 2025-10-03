import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Permission, PERMISSIONS_INFO } from '../types/ModuleManifest';

interface PermissionsDetailsProps {
  permissions: Permission[];
}

const PermissionsDetails = ({ permissions }: PermissionsDetailsProps) => {
  if (permissions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔓</Text>
        <Text style={styles.emptyTitle}>No permissions required</Text>
        <Text style={styles.emptyText}>
          This module doesn't require any special permissions to function.
        </Text>
      </View>
    );
  }

  // Group permissions by risk level
  const highRisk = permissions.filter(p => PERMISSIONS_INFO[p]?.risk === 'high');
  const mediumRisk = permissions.filter(p => PERMISSIONS_INFO[p]?.risk === 'medium');
  const lowRisk = permissions.filter(p => PERMISSIONS_INFO[p]?.risk === 'low');

  const renderPermissionGroup = (title: string, perms: Permission[], color: string) => {
    if (perms.length === 0) return null;

    return (
      <View style={styles.group}>
        <Text style={[styles.groupTitle, { color }]}>{title}</Text>
        {perms.map((permission) => {
          const info = PERMISSIONS_INFO[permission];
          if (!info) return null;

          return (
            <View key={permission} style={styles.permissionItem}>
              <Text style={styles.permissionIcon}>{info.icon}</Text>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionName}>{info.name}</Text>
                <Text style={styles.permissionDescription}>{info.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Required Permissions</Text>
        <Text style={styles.subtitle}>
          This module needs access to the following features:
        </Text>
      </View>

      {renderPermissionGroup('High Risk Permissions', highRisk, '#dc2626')}
      {renderPermissionGroup('Medium Risk Permissions', mediumRisk, '#f59e0b')}
      {renderPermissionGroup('Low Risk Permissions', lowRisk, '#3b82f6')}

      <View style={styles.footer}>
        <Text style={styles.footerIcon}>🔒</Text>
        <Text style={styles.footerText}>
          The module cannot access any features not listed here. Permissions are enforced at runtime.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  group: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  permissionContent: {
    flex: 1,
  },
  permissionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginTop: 8,
  },
  footerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});

export default PermissionsDetails;


