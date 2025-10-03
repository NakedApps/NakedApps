import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moduleRegistry from './moduleRegistry';
import modulesConfig from '../modules.json';
import Layout from './components/Layout';
import { useModulesState } from './hooks/useModulesState';

type RootStackParamList = {
  Home: undefined;
  Module: { moduleName: string };
  MarketPlace: undefined;
};

type ModuleScreenRouteProp = RouteProp<RootStackParamList, 'Module'>;
type ModuleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Module'>;

interface Props {
  route: ModuleScreenRouteProp;
  navigation: ModuleScreenNavigationProp;
}

interface Module {
  name: string;
  description: string;
}

const ModuleLoader = ({ route, navigation }: Props) => {
  const { moduleName } = route.params;
  const [modules, setModules] = useState<Module[]>([]);
  const { isModuleEnabled } = useModulesState();

  useEffect(() => {
    setModules(modulesConfig as Module[]);
  }, []);
  
  // Get the module component from the registry
  const ModuleComponent = moduleRegistry[moduleName];

  const handleModuleSelect = (selectedModuleName: string) => {
    navigation.navigate('Module', { moduleName: selectedModuleName });
  };

  const handleMarketPlacePress = () => {
    navigation.navigate('MarketPlace');
  };

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  // Filter to show only enabled modules
  const enabledModules = modules.filter(m => isModuleEnabled(m.name));

  if (!ModuleComponent) {
    return (
      <Layout
        modules={enabledModules}
        activeModule={moduleName}
        onModuleSelect={handleModuleSelect}
        onMarketPlacePress={handleMarketPlacePress}
        onLogoPress={handleLogoPress}
      >
        <View style={styles.center}>
          <Text style={styles.errorText}>Module '{moduleName}' not found</Text>
          <Text style={styles.hintText}>Available modules: {Object.keys(moduleRegistry).join(', ')}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout
      modules={enabledModules}
      activeModule={moduleName}
      onModuleSelect={handleModuleSelect}
      onMarketPlacePress={handleMarketPlacePress}
      onLogoPress={handleLogoPress}
    >
      <View style={styles.moduleContainer}>
        <ModuleComponent />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  errorText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#d32f2f', 
    marginBottom: 10,
  },
  hintText: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center',
  },
});

export default ModuleLoader;