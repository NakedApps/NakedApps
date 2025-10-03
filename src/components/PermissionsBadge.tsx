import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Permission, PERMISSIONS_INFO } from '../types/ModuleManifest';

interface PermissionsBadgeProps {
  permissions: Permission[];
  showAll?: boolean;
  maxDisplay?: number;
}

const PermissionsBadge = ({ permissions, showAll = false, maxDisplay = 3 }: PermissionsBadgeProps) => {
  if (permissions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.badge, styles.badgeNone]}>
          <Text style={styles.badgeIcon}>✅</Text>
          <Text style={styles.badgeText}>No permissions</Text>
        </View>
      </View>
    );
  }

  const displayPermissions = showAll ? permissions : permissions.slice(0, maxDisplay);
  const remainingCount = permissions.length - displayPermissions.length;

  return (
    <View style={styles.container}>
      {displayPermissions.map((permission) => {
        const info = PERMISSIONS_INFO[permission];
        if (!info) return null;

        return (
          <View
            key={permission}
            style={[
              styles.badge,
              info.risk === 'high' && styles.badgeHigh,
              info.risk === 'medium' && styles.badgeMedium,
              info.risk === 'low' && styles.badgeLow,
            ]}
          >
            <Text style={styles.badgeIcon}>{info.icon}</Text>
            <Text style={styles.badgeText}>{info.name}</Text>
          </View>
        );
      })}
      {remainingCount > 0 && (
        <View style={[styles.badge, styles.badgeMore]}>
          <Text style={styles.badgeText}>+{remainingCount} more</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  badgeHigh: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  badgeMedium: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  badgeLow: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  badgeNone: {
    backgroundColor: '#d1fae5',
    borderWidth: 1,
    borderColor: '#6ee7b7',
  },
  badgeMore: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  badgeIcon: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
});

export default PermissionsBadge;


