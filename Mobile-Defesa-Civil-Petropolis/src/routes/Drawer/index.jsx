import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Alertas from '../../screens/Alerts/index';
import Cartilhas from '../../screens/Cartilhas/index';
import Sobre from '../../screens/Sobre/index';
import Config from '../../screens/Config/index';
import Voluntario from '../../screens/Voluntario/index';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';


const Drawer = createDrawerNavigator();

export default function CustomDrawer() {

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  return (
    <Drawer.Navigator
      initialRouteName="Informativos e Alertas"
      screenOptions={{
        drawerIcon: '',
        drawerPosition: 'right',
        drawerType: 'slide',
        headerShown: false,
        drawerStyle: {backgroundColor: theme === "dark" ? "#000" : "#fff"},
        drawerActiveTintColor: theme === "dark" ? "#fff" : "#000",
        drawerActiveBackgroundColor:  theme === "dark" ? "#222" : "#e0e0e0",
        drawerInactiveBackgroundColor:  theme === "dark" ? "#000" : "#e0e0e0",
        drawerInactiveTintColor: theme === "dark" ? "#fff" : "#000"
      }}
     
    >
      <Drawer.Screen name="Informativos e Alertas" component={Alertas} />
      <Drawer.Screen name="Orientações - Cartilhas" component={Cartilhas} />

      <Drawer.Screen name="Voluntariar-se" component={Voluntario} />
      <Drawer.Screen name="Quem somos" component={Sobre} />
      {/* <Drawer.Screen name="Configurações" component={Config} /> */}
    </Drawer.Navigator>

  );
}
