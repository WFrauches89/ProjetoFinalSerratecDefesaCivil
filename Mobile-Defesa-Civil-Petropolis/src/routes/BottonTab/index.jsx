import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import Home from '../../screens/Home/index';
import Clima from '../../screens/Clima/index';
import Rios from '../../screens/Rios/index';
import Apoio from '../../screens/Apoio/index';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View, TouchableOpacity } from 'react-native';
import rios from '../../../assets/rios.png';
import security from '../../../assets/security.png';
import rain from '../../../assets/rain.png';
import CustomDrawer from '../Drawer/index';

const Tab = createBottomTabNavigator();

export function BottonTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 61,
          backgroundColor: '#005FB3',
        },
        tabBarActiveTintColor: '#fc6c0c',
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={48} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      />

      {/* <Tab.Screen
        name="CLIMA"
        component={Clima}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: 48, height: 48 }}>
              <Image
                source={rain}
                style={{ width: '100%', height: '100%', tintColor: color }}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      /> */}
      <Tab.Screen
        name="RIOS"
        component={Rios}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: 48, height: 48 }}>
              <Image
                source={rios}
                style={{ width: '100%', height: '100%', tintColor: color }}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="APOIO"
        component={Apoio}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ width: 48, height: 48 }}>
              <Image
                source={security}
                style={{ width: '100%', height: '100%', tintColor: color }}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      />

      <Tab.Screen
        name="OUTROS"
        component={CustomDrawer}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="menu" size={48} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
