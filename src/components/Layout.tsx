import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface Module {
  name: string;
  description: string;
}

interface LayoutProps {
  modules: Module[];
  activeModule: string | null;
  onModuleSelect: (moduleName: string) => void;
  onMarketPlacePress?: () => void;
  onLogoPress?: () => void;
  children: React.ReactNode;
}

const Layout = ({ modules, activeModule, onModuleSelect, onMarketPlacePress, onLogoPress, children }: LayoutProps) => {
  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  return (
    <View style={styles.container}>
      <Sidebar
        modules={modules}
        activeModule={activeModule}
        onModuleSelect={onModuleSelect}
        onMarketPlacePress={onMarketPlacePress}
      />
      <View style={styles.mainContent}>
        <TopBar
          activeModuleName={activeModule || undefined}
          onSearch={handleSearch}
          onSettingsPress={handleSettingsPress}
          onLogoPress={onLogoPress}
        />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...(Platform.OS === 'web' ? {
      height: '100vh' as any,
      flexDirection: 'row' as any,
      backgroundColor: '#f9fafb',
      overflow: 'hidden' as any,
    } : {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f9fafb',
    }),
  },
  mainContent: {
    ...(Platform.OS === 'web' ? {
      flex: 1 as any,
      flexDirection: 'column' as any,
      overflow: 'hidden' as any,
    } : {
      flex: 1,
      flexDirection: 'column',
    }),
  },
  content: {
    ...(Platform.OS === 'web' ? {
      flex: 1 as any,
      backgroundColor: '#ffffff',
      overflow: 'hidden' as any,
    } : {
      flex: 1,
      backgroundColor: '#ffffff',
    }),
  },
});

export default Layout;