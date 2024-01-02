import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TabRoutes } from './src/routes/index';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#005FB3" barStyle="light-content" />
      <TabRoutes />
    </NavigationContainer>
  );
}
