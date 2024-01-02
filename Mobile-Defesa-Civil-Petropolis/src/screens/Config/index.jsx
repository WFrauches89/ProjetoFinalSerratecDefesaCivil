import React, { useState } from 'react';
import { Text,  View } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { stylesDark } from './stylesDark';
import { stylesLight } from './stylesLight';
import { Appearance } from 'react-native';

export default function Config({ navigation }) {
  useFocusEffect(() => {
    navigation.openDrawer();
  });

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  return (
    <>
    <View style={theme == "light" ?stylesLight.container:stylesDark.container}>
      <Text style={theme == "light" ?stylesLight.title:stylesDark.title}> Config </Text>
    </View>
    </>
  );
}
