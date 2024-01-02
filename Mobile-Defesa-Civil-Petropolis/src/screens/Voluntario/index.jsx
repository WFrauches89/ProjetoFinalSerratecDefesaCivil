import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Linking, View } from 'react-native';
import { styles } from './style';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';

export default function Voluntario({ navigation }) {
  const jumpToAction = DrawerActions.jumpTo('Informativos e Alertas', {
    name: 'Informativos e Alertas',
  });

  useFocusEffect(() => {
    navigation.openDrawer();
    Linking.openURL(
      'https://web3.petropolis.rj.gov.br/e-gov//dfc/cadastro_celular_e_voluntarios/cadastro_voluntario.php',
    );
    navigation.dispatch(jumpToAction);
  });
}
