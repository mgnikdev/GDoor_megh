import React from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './Source/Navigation/RootStack';
export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}