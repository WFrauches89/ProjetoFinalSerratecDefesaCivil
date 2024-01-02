Home

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  useColorScheme,
} from 'react-native';
import { styles } from './styles';
import { Linking } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import api from '../../services/api';
import { Appearance } from 'react-native';

export default function Home({ navigation }) {

  //Tempo
  const [dados, setDados] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://api.openweathermap.org/data/2.5/weather?lat=-22.5075743&lon=-43.1785356&appid=556c3672ccbc287661566d5e9ac0e743&units=metric&lang=pt_br',
  //       );
  //       const dadosdaAPI = await response.json();
  //       setDados(dadosdaAPI);
  //     } catch (erro) {
  //       console.error('Erro ao buscar dados da API:', erro);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const verificacaoInternet = useNetInfo();

  //Estágio operacional

  const [estagio, setEstagio] = useState();
  const [outraCoisa, setOutraCoisa] = useState();

  useEffect(() => {
    const fetchEstagioOperacional = async () => {
      try {
        const { data } = await api.get(`/informativo/estagioOperacional`);
        // const data = await response.text();
        const dataHoraAtualizacao = new Date();
        const dataFormatada = format(dataHoraAtualizacao, 'dd/MM/yyyy HH:mm', {
          locale: ptBR,
        });
        setEstagio(data);
        setOutraCoisa(dataFormatada);
        const estagioOff = {
          horario: outraCoisa,
          condicao: data,
        };
        await AsyncStorage.setItem(
          'guardarEstagio',
          JSON.stringify(estagioOff),
        );
      } catch (error) {
        console.error('Erro ao obter a palavra da API estagio', `${error}`);
        console.log(error);

        let estagioOff = await AsyncStorage.getItem('guardarEstagio');
        estagioOff = JSON.parse(estagioOff);
        setEstagio(estagioOff.condicao);
        setOutraCoisa(estagioOff.horario);
      }
    };

    fetchEstagioOperacional();
  }, []);

  // FlatList
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);

  const discarNumero = () => {
    const numeroTelefone = '199';
    Linking.openURL(`tel:${numeroTelefone}`);
  };

  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    if (loading) return;

    setloading(true);

    try {
      const { data } = await api.get(`/informativo/listarInformes`);

      const dataFormatada = data.map((item) => ({
        ...item,
        dataEvento: item.dataEvento
          ? format(new Date(item.dataEvento), 'dd/MM/yyyy')
          : null,
      }));

      const filtro = dataFormatada.filter((item) => item.ativo !== false);
      const ordem = filtro.sort((a, b) =>
        a.dataPostagem > b.dataPostagem
          ? -1
          : a.dataPostagem < b.dataPostagem
          ? 1
          : 0,
      );
      // a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
      setData([...ordem]);
      setPage(page + 1);
    } catch (error) {
      console.log('Erro ao obter a palavra da API alerta', `${error}`);

      console.error('Erro ao carregar dados: alerta', error);
    } finally {
      setloading(false);
    }
  }

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  const truncateText = (descricao, maxLength) => {
    const firstDotIndex = descricao.indexOf(' . ');
    const truncatedText =
      firstDotIndex !== -1
        ? descricao.substring(0, firstDotIndex + 1)
        : descricao;
  
    return truncatedText.length > maxLength
      ? truncatedText.substring(0, maxLength) + ' ...'
      : truncatedText;
  };

  function ListItem({ data }) {
    return (
      <View style={{...styles.listItem, backgroundColor: theme === "dark" ? "#222" : "#e0e0e0"}}>
        <View style={styles.ladoEsquerdo}>
          <Text style={{...styles.listText, color: theme === "dark" ? "white" : "#666666"}}>{data.titulo}</Text>
          <Text style={{ fontSize: 15, textAlign: 'auto', color: theme === "dark" ? "white" : "#666666"}}>
            {truncateText(data.descricao, 100)}
          </Text>
  
          {data.dataEvento !== null && (
            <View style={styles.botaoDataFlatList}>
              <Text style={styles.dataEvento}>{data.dataEvento}</Text>
            </View>
          )}
        </View>
  
        <View style={styles.ladoDireito}>
          <Text style={{ flex: 1, marginTop: -10, color: theme === "dark" ? "white" : "#666666" }}>
            {data.dataPostagem}
          </Text>
          {/* <TouchableOpacity>
            <Text style={{ color: '#138496', fontWeight: 'bold', fontSize: 18 }}>
              Ver mais
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
  

  return (
    <View style={{...styles.container, backgroundColor: theme === "dark" ? "black" : "white"}}>
      <View style={{ borderRadius: 20, width: '95%', height: '40%' }}>
        <Image
          source={require('../../../assets/catedral.png')}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
        <View style={{ marginTop: -160, marginHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', color: '#ffff', fontSize: 17 }}>
            {estagio}
          </Text>
          <Text
            style={{
              color: '#ffff',
              fontWeight: 'bold',
              fontSize: 22,
              zIndex: 99,
              textAlign: 'right',
            }}
          >
            {/* {dados.main.temp} °C */}
          </Text>
          {dados ? (
            <Text
              style={{
                color: '#ffff',
                fontWeight: 'bold',
                fontSize: 22,
                zIndex: 99,
                textAlign: 'right',
              }}
            >
              {dados.weather[0].description}
            </Text>
          ) : (
            <Text>Carregando ...</Text>
          )}
        </View>

        {estagio &&
          (estagio == 'NORMALIDADE' ? (
            <View
              style={{
                backgroundColor: 'rgba(74, 201, 79, 0.78)',
                width: '100%',
                height: 20,
                zIndex: 100,
                marginTop: 58,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flex: 1,
                marginTop: 58,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Atualizado em: {outraCoisa}</Text>
            </View>
          ) : estagio == 'OBSERVAÇÃO' ? (
            <View
              style={{
                backgroundColor: 'rgba(209, 197, 11, 0.78)',
                width: '100%',
                zIndex: 100,
                marginBottom: 0,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flex: 1,
                marginTop: 58,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Atualizado em: {outraCoisa}</Text>
            </View>
          ) : estagio == 'ATENÇÃO' ? (
            <View
              style={{
                backgroundColor: 'rgba(227, 150, 16, 0.78)',
                width: '100%',
                height: 20,
                zIndex: 100,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flex: 1,
                marginTop: 58,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Atualizado em: {outraCoisa}</Text>
            </View>
          ) : estagio == 'ALERTA' ? (
            <View
              style={{
                backgroundColor: 'rgba(224, 17, 17, 0.78)',
                width: '100%',
                height: 20,
                zIndex: 100,

                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flex: 1,
                marginTop: 58,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Atualizado em: {outraCoisa}</Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(000, 000, 000, 0.78)',
                width: '100%',
                height: 20,
                zIndex: 100,

                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flex: 1,
                marginTop: 58,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff' }}>Atualizado em: {outraCoisa}</Text>
            </View>
          ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={discarNumero}>
        <Text style={styles.textobotao}>Ligar 199</Text>
      </TouchableOpacity>

      <View style={{...styles.flatList, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
        <View style={{...styles.Viewalerta, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
          <Text style={{...styles.textAlerta, color: theme === "dark" ? "white" : "#666666"}}>Alertas</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff8c00',
              width: '50%',
              marginTop: '1%',
              height: '60%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('OUTROS')}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.Viewalerta2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
          <FlatList
            data={data.slice(0, 5)}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ListItem data={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    </View>
  );
}



