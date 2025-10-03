import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Module {
  name: string;
  description: string;
}

interface SidebarProps {
  modules: Module[];
  activeModule: string | null;
  onModuleSelect: (moduleName: string) => void;
  onMarketPlacePress?: () => void;
}

const Sidebar = ({ modules, activeModule, onModuleSelect, onMarketPlacePress }: SidebarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌟 LocaLite</Text>
        <Text style={styles.subtitle}>Your Local Toolkit</Text>
      </View>
      {onMarketPlacePress && (
        <TouchableOpacity
          style={styles.marketPlaceButton}
          onPress={onMarketPlacePress}
        >
          <Text style={styles.marketPlaceIcon}>🛒</Text>
          <Text style={styles.marketPlaceText}>MarketPlace</Text>
          <Text style={styles.marketPlaceArrow}>→</Text>
        </TouchableOpacity>
      )}
      <ScrollView style={styles.modulesList}>
        <Text style={styles.sectionTitle}>MODULES</Text>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.name}
            style={[
              styles.moduleItem,
              activeModule === module.name && styles.moduleItemActive
            ]}
            onPress={() => onModuleSelect(module.name)}
          >
            <View style={styles.moduleIcon}>
              <Text style={styles.moduleIconText}>
                {module.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.moduleInfo}>
              <Text style={[
                styles.moduleName,
                activeModule === module.name && styles.moduleNameActive
              ]}>
                {module.name.replace('-', ' ').split(' ').map(w => 
                  w.charAt(0).toUpperCase() + w.slice(1)
                ).join(' ')}
              </Text>
              <Text style={styles.moduleDescription} numberOfLines={1}>
                {module.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#065f46',
    borderRightWidth: 1,
    borderRightColor: '#047857',
    flexDirection: 'column',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#047857',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#d1fae5',
    opacity: 0.8,
  },
  marketPlaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: '#047857',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#10b981',
    cursor: 'pointer',
  },
  marketPlaceIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  marketPlaceText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  marketPlaceArrow: {
    fontSize: 18,
    color: '#d1fae5',
  },
  modulesList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#d1fae5',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  moduleItemActive: {
    backgroundColor: '#10b981',
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moduleInfo: {
    flex: 1,
  },
  moduleName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f0fdf4',
    marginBottom: 2,
  },
  moduleNameActive: {
    color: '#ffffff',
  },
  moduleDescription: {
    fontSize: 12,
    color: '#d1fae5',
    opacity: 0.7,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#047857',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#d1fae5',
    opacity: 0.6,
  },
});

export default Sidebar;