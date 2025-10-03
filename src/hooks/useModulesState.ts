import { useState, useEffect } from 'react';

// Hook to manage enabled/disabled state of modules
export const useModulesState = () => {
  const [enabledModules, setEnabledModules] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load enabled modules from localStorage on mount
  useEffect(() => {
    const loadEnabledModules = () => {
      try {
        const stored = localStorage.getItem('enabledModules');
        if (stored) {
          const parsed = JSON.parse(stored);
          setEnabledModules(new Set(parsed));
        } else {
          // By default, all modules are enabled
          // This will be set when modules are loaded
          setEnabledModules(new Set());
        }
      } catch (error) {
        console.error('Error loading enabled modules:', error);
        setEnabledModules(new Set());
      }
      setIsLoaded(true);
    };

    loadEnabledModules();
  }, []);

  // Save to localStorage whenever enabledModules changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('enabledModules', JSON.stringify(Array.from(enabledModules)));
      } catch (error) {
        console.error('Error saving enabled modules:', error);
      }
    }
  }, [enabledModules, isLoaded]);

  const toggleModule = (moduleName: string) => {
    setEnabledModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleName)) {
        newSet.delete(moduleName);
      } else {
        newSet.add(moduleName);
      }
      return newSet;
    });
  };

  const isModuleEnabled = (moduleName: string): boolean => {
    return enabledModules.has(moduleName);
  };

  const enableAllModules = (moduleNames: string[]) => {
    setEnabledModules(new Set(moduleNames));
  };

  const disableAllModules = () => {
    setEnabledModules(new Set());
  };

  return {
    enabledModules,
    toggleModule,
    isModuleEnabled,
    enableAllModules,
    disableAllModules,
    isLoaded,
  };
};


