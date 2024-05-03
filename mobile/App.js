import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import DAOScreen from './screens/DAOScreen';
import NFTMarketplaceScreen from './screens/NFTMarketplaceScreen';
import DeFiScreen from './screens/DeFiScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import GamificationScreen from './screens/GamificationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DAO" component={DAOScreen} />
          <Stack.Screen name="NFT Marketplace" component={NFTMarketplaceScreen} />
          <Stack.Screen name="DeFi" component={DeFiScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="Gamification" component={GamificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
