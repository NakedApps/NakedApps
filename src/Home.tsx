import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import modulesConfig from '../modules.json';
import Layout from './components/Layout';
import { useModulesState } from './hooks/useModulesState';

type RootStackParamList = {
  Home: undefined;
  Module: { moduleName: string };
  MarketPlace: undefined;
  TestScroll: undefined;
  SimpleScrollTest: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Module {
  name: string;
  description: string;
}

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const { isModuleEnabled, enableAllModules, isLoaded } = useModulesState();

  useEffect(() => {
    const loadedModules = modulesConfig as Module[];
    setModules(loadedModules);
    
    if (isLoaded && !localStorage.getItem('enabledModules')) {
      enableAllModules(loadedModules.map(m => m.name));
    }
  }, [isLoaded]);

  const handleModuleSelect = (moduleName: string) => {
    navigation.navigate('Module', { moduleName });
  };

  const handleMarketPlacePress = () => {
    navigation.navigate('MarketPlace');
  };


  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const enabledModules = modules.filter(m => isModuleEnabled(m.name));


  return (
    <Layout
      modules={enabledModules}
      activeModule={null}
      onModuleSelect={handleModuleSelect}
      onMarketPlacePress={handleMarketPlacePress}
      onLogoPress={handleLogoPress}
    >
      <View style={styles.container}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to NakedApps! 👋</Text>
          <Text style={styles.welcomeText}>
            Your local toolkit for everyday tasks. Select a module from the sidebar to get started.
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <Text style={styles.statNumber}>{enabledModules.length}</Text>
            <Text style={styles.statLabel}>Active Modules</Text>
          </View>
          <View style={[styles.statCard, styles.statCardLightGreen]}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Offline Ready</Text>
          </View>
          <View style={[styles.statCard, styles.statCardEmerald]}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Cloud Dependency</Text>
          </View>
        </View>

        <View style={styles.scrollableSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          {Platform.OS === 'web' ? (
            <div className="scrollable-y" style={styles.modulesGridWeb as any}>
              {enabledModules.map((module) => (
                <TouchableOpacity
                  key={module.name}
                  style={styles.moduleCard}
                  onPress={() => handleModuleSelect(module.name)}
                >
                  <View style={styles.moduleCardIcon}>
                    <Text style={styles.moduleCardIconText}>
                      {module.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.moduleCardTitle}>
                    {module.name.replace('-', ' ').split(' ').map(w => 
                      w.charAt(0).toUpperCase() + w.slice(1)
                    ).join(' ')}
                  </Text>
                  <Text style={styles.moduleCardDescription}>
                    {module.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </div>
          ) : (
            <ScrollView style={styles.modulesGrid} contentContainerStyle={styles.modulesGridContent}>
              {enabledModules.map((module) => (
                <TouchableOpacity
                  key={module.name}
                  style={styles.moduleCard}
                  onPress={() => handleModuleSelect(module.name)}
                >
                  <View style={styles.moduleCardIcon}>
                    <Text style={styles.moduleCardIconText}>
                      {module.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.moduleCardTitle}>
                    {module.name.replace('-', ' ').split(' ').map(w => 
                      w.charAt(0).toUpperCase() + w.slice(1)
                    ).join(' ')}
                  </Text>
                  <Text style={styles.moduleCardDescription}>
                    {module.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
  },
  welcomeSection: {
    padding: 32,
    backgroundColor: '#ffffff',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statCardGreen: {
    backgroundColor: '#10b981',
  },
  statCardLightGreen: {
    backgroundColor: '#34d399',
  },
  statCardEmerald: {
    backgroundColor: '#059669',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  quickAccessSection: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 16,
  },
  scrollableSection: {
    flex: 1,
    paddingHorizontal: 32,
    marginBottom: 24,
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
    maxHeight: '300px' as any,
    padding: '10px' as any,
  },
  modulesGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  moduleCard: {
    width: 'calc(33.333% - 11px)' as any,
    minWidth: 200,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    cursor: 'pointer',
  },
  moduleCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleCardIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
  },
  moduleCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  moduleCardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default Home;