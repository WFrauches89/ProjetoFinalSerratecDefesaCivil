import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesLight } from './stylesLight';
import { stylesDark } from './stylesDark'
import { Appearance } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Sobre = ({ navigation }) => {

  const [quemSomos, setQuemSomos] = useState([]);
  const faceLink = 'https://www.facebook.com/defesacivilpetropolis';
  const inLink = 'https://www.linkedin.com/in/defesa-civil-petrópolis-700bb2275/';
  const instaLink ='https://www.instagram.com/defesacivil_petropolis/';
  const youLink = 'https://www.youtube.com/@SEMPDEC/featured';

  useFocusEffect(() => {
    navigation.openDrawer();
  });

  const handleFaceClick = () => {
    Linking.openURL(faceLink);
  };
  const handleInClick = () => {
    Linking.openURL(inLink);
  };
  const handleInstaClick = () => {
    Linking.openURL(instaLink);
  };
  const handleYouClick = () => {
    Linking.openURL(youLink);
  };

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("tentativa");
        const response = await api.get('/quemsomos');
        const dados = response.data;
        console.log(dados);
        await AsyncStorage.setItem('quemSomosData', JSON.stringify(dados));

        setQuemSomos(dados);
        console.log(quemSomos)
      } catch (error) {
        console.error('Erro ao obter dados da API', error);

        const dadosSalvos = await AsyncStorage.getItem('quemSomosData');
        if (dadosSalvos) {
          setQuemSomos(JSON.parse(dadosSalvos));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View style={theme == "light" ? stylesLight.container : stylesDark.container}>
      <View style={theme == "light" ?stylesLight.boxTitulo:stylesDark.boxTitulo}>
        <Text style={theme == "light" ?stylesLight.titulo:stylesDark.titulo}>Quem Somos</Text>
      </View >
      <View style={stylesLight.boxImages}>
        <View style={stylesLight.boxImage}>
          <Image
            source={require('../../../assets/logo.png')}
            style={stylesLight.image}
          />
        </View>
        <View style={stylesLight.boxImage}>
          <Image
            source={require('../../../assets/Brasão_de_petrópolis_02.png')}
            style={stylesLight.image}
          />
        </View>
      </View>
      {quemSomos[0] !== undefined ? (
      <ScrollView style={theme == "light" ?stylesLight.corpo:stylesDark.corpo}>
        <View style={theme == "light" ?stylesLight.boxDescricao:stylesDark.boxDescricao}>
          <Text style={theme == "light" ? stylesLight.textoDescricao : stylesDark.textoDescricao}>{quemSomos[0]?.descricao}</Text>
        </View>
        <View style={stylesLight.informacoes}>
          <Text style={theme == "light" ?stylesLight.informacao:stylesDark.informacao}>Endereço: {quemSomos[0]?.endereco}</Text>
          <Text style={theme == "light" ?stylesLight.informacao:stylesDark.informacao}>Telefone: {quemSomos[0]?.telefone}</Text>
          <Text style={theme == "light" ?stylesLight.informacao:stylesDark.informacao}>Email: {quemSomos[0]?.email}</Text>
          <Text style={theme == "light" ?stylesLight.informacao:stylesDark.informacao}>Horário de Atendimento: {quemSomos[0]?.horarioAtendimento}</Text>
          <Text style={theme == "light" ?stylesLight.informacao:stylesDark.informacao}>Secretário: {quemSomos[0]?.secretario}</Text>
        </View>
        <View style= {theme == "light" ?stylesLight.links:stylesLight.links}>
              <TouchableOpacity onPress={handleFaceClick} style={{ padding: 5 }}>
                <Entypo name="facebook-with-circle" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInClick} style={{ padding: 5 }}>
                <Entypo name="linkedin-with-circle" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInstaClick} style={{ padding: 5 }}>
                <Entypo name="instagram-with-circle" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleYouClick} style={{ padding: 5 }}>
                <Entypo name="youtube-with-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
      </ScrollView>)
      : (<View><Text>Nenhum dado disponível</Text></View>)}
      
    
    </View >
  )
}

export default Sobre