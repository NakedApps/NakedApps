import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import modulesConfig from '../modules.json';
import Layout from './components/Layout';
import { useModulesState } from './hooks/useModulesState';
import { getModuleManifest } from './utils/moduleManifests';
import PermissionsBadge from './components/PermissionsBadge';
import PermissionsDetails from './components/PermissionsDetails';

type RootStackParamList = {
  Home: undefined;
  Module: { moduleName: string };
  MarketPlace: undefined;
};

type MarketPlaceNavigationProp = StackNavigationProp<RootStackParamList, 'MarketPlace'>;

interface Module {
  name: string;
  description: string;
}

interface ModuleCardProps {
  module: Module;
  isEnabled: boolean;
  onToggle: () => void;
  onViewPermissions: () => void;
}

const ModuleCard = ({ module, isEnabled, onToggle, onViewPermissions }: ModuleCardProps) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(isEnabled ? 1 : 0.5));
  const manifest = getModuleManifest(module.name);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: isEnabled ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, opacityAnim]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle();
  };

  const displayName = manifest?.displayName || module.name
    .replace('-', ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const displayIcon = manifest?.icon || module.name.charAt(0).toUpperCase();

  return (
    <Animated.View
      style={[
        styles.moduleCard,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={[styles.statusBadge, isEnabled ? styles.statusEnabled : styles.statusDisabled]}>
        <Text style={styles.statusText}>{isEnabled ? '✓ ACTIVE' : '○ DISABLED'}</Text>
      </View>

      <TouchableOpacity
        style={styles.cardTouchable}
        onPress={handlePress}
      >
        <View style={styles.moduleIcon}>
          <Text style={styles.moduleIconText}>{displayIcon}</Text>
        </View>

        <Text style={styles.moduleTitle}>{displayName}</Text>
        <Text style={styles.moduleDescription}>{module.description}</Text>

        {manifest?.permissions && manifest.permissions.length > 0 && (
          <View style={styles.permissionsContainer}>
            <PermissionsBadge permissions={manifest.permissions} maxDisplay={2} />
          </View>
        )}

        <Text style={styles.actionHint}>
          {isEnabled ? 'Click to disable' : 'Click to enable'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.permissionsButton}
        onPress={onViewPermissions}
      >
        <Text style={styles.permissionsButtonIcon}>🔒</Text>
        <Text style={styles.permissionsButtonText}>View Permissions</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const MarketPlace = ({ navigation }: { navigation: MarketPlaceNavigationProp }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const { enabledModules, toggleModule, isModuleEnabled, enableAllModules, disableAllModules, isLoaded } = useModulesState();

  useEffect(() => {
    const loadedModules = modulesConfig as Module[];
    setModules(loadedModules);
    
    if (isLoaded && enabledModules.size === 0) {
      enableAllModules(loadedModules.map(m => m.name));
    }
  }, [isLoaded]);

  const handleViewPermissions = (moduleName: string) => {
    setSelectedModule(moduleName);
    setShowPermissionsModal(true);
  };

  const closePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedModule(null);
  };

  const selectedManifest = selectedModule ? getModuleManifest(selectedModule) : null;

  const handleModuleSelect = (moduleName: string) => {
    if (isModuleEnabled(moduleName)) {
      navigation.navigate('Module', { moduleName });
    }
  };

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const enabledCount = Array.from(enabledModules).length;
  const totalCount = modules.length;


  return (
    <Layout
      modules={modules.filter(m => isModuleEnabled(m.name))}
      activeModule={null}
      onModuleSelect={handleModuleSelect}
      onLogoPress={handleLogoPress}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Module MarketPlace 🛒</Text>
              <Text style={styles.subtitle}>
                Enable or disable modules to customize your workspace
              </Text>
            </View>
            
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => enableAllModules(modules.map(m => m.name))}
              >
                <Text style={styles.quickButtonText}>Enable All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickButton, styles.quickButtonSecondary]}
                onPress={() => disableAllModules()}
              >
                <Text style={styles.quickButtonTextSecondary}>Disable All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{enabledCount}</Text>
              <Text style={styles.statLabel}>Active Modules</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalCount - enabledCount}</Text>
              <Text style={styles.statLabel}>Disabled Modules</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalCount}</Text>
              <Text style={styles.statLabel}>Total Available</Text>
            </View>
          </View>
        </View>

        <View style={styles.scrollableSection}>
          <Text style={styles.sectionTitle}>Available Modules</Text>
          {Platform.OS === 'web' ? (
            <div className="scrollable-y" style={styles.modulesGridWeb as any}>
              {modules.map((module) => (
                <ModuleCard
                  key={module.name}
                  module={module}
                  isEnabled={isModuleEnabled(module.name)}
                  onToggle={() => toggleModule(module.name)}
                  onViewPermissions={() => handleViewPermissions(module.name)}
                />
              ))}
            </div>
          ) : (
            <ScrollView style={styles.modulesGrid} contentContainerStyle={styles.modulesGridContent}>
              {modules.map((module) => (
                <ModuleCard
                  key={module.name}
                  module={module}
                  isEnabled={isModuleEnabled(module.name)}
                  onToggle={() => toggleModule(module.name)}
                  onViewPermissions={() => handleViewPermissions(module.name)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoIcon}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How it works</Text>
            <Text style={styles.infoText}>
              Click on any module card to enable or disable it. Disabled modules won't appear 
              in your sidebar, helping you keep your workspace clean and focused.
            </Text>
          </View>
        </View>

        <Modal
          visible={showPermissionsModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closePermissionsModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>
                    {selectedManifest?.displayName || selectedModule}
                  </Text>
                  <Text style={styles.modalSubtitle}>Required Permissions</Text>
                </View>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={closePermissionsModal}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {selectedManifest && (
                  <PermissionsDetails permissions={selectedManifest.permissions} />
                )}
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={closePermissionsModal}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 32,
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    cursor: 'pointer',
  },
  quickButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  quickButtonTextSecondary: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  scrollableSection: {
    flex: 1,
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 16,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  modulesGridWeb: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
    maxHeight: '400px' as any,
    padding: '10px' as any,
  },
  modulesGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  moduleCard: {
    width: 'calc(33.333% - 11px)' as any,
    minWidth: 220,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  cardTouchable: {
    padding: 24,
    paddingBottom: 16,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  statusEnabled: {
    backgroundColor: '#10b981',
  },
  statusDisabled: {
    backgroundColor: '#6b7280',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moduleIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleIconText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#065f46',
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionHint: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginTop: 8,
  },
  permissionsContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  permissionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    gap: 6,
    cursor: 'pointer',
  },
  permissionsButtonIcon: {
    fontSize: 14,
  },
  permissionsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#6b7280',
  },
  modalBody: {
    maxHeight: 400,
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  modalButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 24,
    margin: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default MarketPlace;