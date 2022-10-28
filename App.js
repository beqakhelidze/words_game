import * as React from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message'
import Default from "./screens/Default";
import Gaming from './screens/Gaming';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(0,0,0,0.5)"
        hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="default"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="default" component={Default} />
          <Stack.Screen name="gaming" component={Gaming} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
});

