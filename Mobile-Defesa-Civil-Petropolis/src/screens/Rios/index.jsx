Rios 

import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, View, useColorScheme } from 'react-native';
import styles from './styles';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import api from '../../services/api';
import { Appearance } from 'react-native';

export default function Rios() {

  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState([]);
  
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })


  const pegar = async () => {
    const { data } = await api.get('/informativo/rios')
    setDados(data)
    setFiltro(data)
    console.log(data);
  }
  useEffect(() => {
    pegar();
  }, []);

  const pesquisa = (valor) => {
    const fil = dados.filter((item) => {
      return item.rio.toLowerCase().includes(valor.toLowerCase())||item.estacao.toLowerCase().includes(valor.toLowerCase())
    })
    setFiltro(fil);
  };

  return (
    <View style={{...styles.pagina, backgroundColor: theme === "dark" ? "black" : "white"}}>
      <View style={{...styles.titulo, backgroundColor: theme === "dark" ? "#333" : "#D9D9D9"}}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}> NÍVEL DOS  RIOS </Text>
      </View>

      <View style={styles.filtro}>
        <View style={styles.pesquisa}>
          <TextInput style={{ width: '80%'}} 
          placeholder="Pesquisar" 
          placeholderTextColor={theme === "dark" ? "#fff" : "#000" }
          onChangeText={(valor) => pesquisa(valor)}/>
          <EvilIcons name="search" size={20} color={theme === "dark" ? "#fff" : "#000"} />
        </View>
      </View>

      <View style={{...styles.cabecalhoLista, backgroundColor: theme === "dark" ? "#333" : "#D9D9D9"}}>
        <View style={styles.itemCabecalho}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}>Curso</Text>
        </View>
        <View style={styles.itemCabecalho}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}>Estação</Text>
        </View>
        <View style={styles.itemCabecalho}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}>Status do rio</Text>
        </View>
        <View style={{ ...styles.itemCabecalho, flex: 1.3 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}>Status de monitoramento</Text>
        </View>
        <View style={styles.itemCabecalho}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme === "dark" ? "white" : "black" }}>Última leitura</Text>
        </View>
      </View>

      <View style={styles.lista}>
        <FlatList
          data={filtro}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View style={[styles.linhalista, index % 2 === 0 ? {...styles.par, backgroundColor: theme === "dark" ? "#555" : "#D9D9D9" } : {...styles.impar,  backgroundColor: theme === "dark" ? "#333" : "#D9D9D9" }]}>
              <View style={styles.itemLista}>
                <Text style={{ textAlign: 'center', fontSize: 12, color: theme === "dark" ? "#fff" : "#000"  }}>{item.rio}</Text>
              </View>
              <View style={styles.itemLista}>
                <Text style={{ textAlign: 'center', fontSize: 12, color: theme === "dark" ? "#fff" : "#000" }}>{item.estacao}</Text>
              </View>
              <View style={styles.itemLista}>
                {item.status == "estavel" ?
                  // <Image
                  //   source={require(`../../../assets/estavel.png`)}
                  //   style={{ width: '100%', height: 40, width: 40, borderRadius: 10 }}
                  // />
                  <Entypo name="arrow-bold-right" size={40} color="#5686E1" />
                  : item.status == "descendo" ?
                    // <Image
                    //   source={require(`../../../assets/descendo.png`)}
                    //   style={{ width: '100%', height: 40, width: 40, borderRadius: 10 }}
                    // />

                    <Entypo name="arrow-bold-down" size={40} color="#78A55A" />
                    : item.status == "subindo" ?
                      // <Image
                      //   source={require(`../../../assets/subindo.png`)}
                      //   style={{ width: '100%', height: 40, width: 40, borderRadius: 10 }}
                      // /> 
                      <Entypo name="arrow-bold-up" size={40} color="#EB3223" />
                      : null}
              </View>
              <View style={[styles.itemLista, item.monitoramento == 'ALERTA' ? styles.alerta : item.monitoramento == 'ATENÇÃO' ? styles.atencao : item.monitoramento == 'VIGILÂNCIA' ? styles.vigilancia : styles.rede]}>
                <Text style={{ textAlign: 'center', color: "#FFF", fontSize: 12 }}>{item.monitoramento}</Text>
              </View>
              <View style={styles.itemLista}>
                <Text style={{ textAlign: 'center', fontSize: 11, color: theme === "dark" ? "#fff" : "#000" }}>{item.leitura}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
