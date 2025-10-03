import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ModuleLoader from './ModuleLoader';
import MarketPlace from './MarketPlace';

// Import web styles for controlled scroll
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      height: 100vh;
      overflow: hidden;
    }
    #root {
      height: 100vh;
      overflow: hidden;
    }
    .scrollable {
      overflow: auto;
    }
    .scrollable-y {
      overflow-y: auto;
      overflow-x: hidden;
    }
  `;
  document.head.appendChild(style);
}

type RootStackParamList = {
  Home: undefined;
  Module: { moduleName: string };
  MarketPlace: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Module" component={ModuleLoader} />
        <Stack.Screen name="MarketPlace" component={MarketPlace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
