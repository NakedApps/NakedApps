import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface TopBarProps {
  activeModuleName?: string;
  onSearch?: (query: string) => void;
  onSettingsPress?: () => void;
  onLogoPress?: () => void;
}

const TopBar = ({ activeModuleName, onSearch, onSettingsPress, onLogoPress }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      {/* Left Section - Title */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onLogoPress} style={styles.logoContainer}>
          <Text style={styles.title}>
            {activeModuleName 
              ? activeModuleName.replace('-', ' ').split(' ').map(w => 
                  w.charAt(0).toUpperCase() + w.slice(1)
                ).join(' ')
              : 'NakedApps'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Center Section - Search Bar */}
      <View style={styles.centerSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules, tools..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* Right Section - Actions */}
      <View style={styles.rightSection}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => console.log('Notifications')}
        >
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onSettingsPress}
        >
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>U</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  leftSection: {
    flex: 0,
    minWidth: 200,
  },
  logoContainer: {
    cursor: 'pointer',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46', // Dark green
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    outlineStyle: 'none',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconText: {
    fontSize: 18,
  },
  profileButton: {
    marginLeft: 8,
    cursor: 'pointer',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981', // Green
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default TopBar;


