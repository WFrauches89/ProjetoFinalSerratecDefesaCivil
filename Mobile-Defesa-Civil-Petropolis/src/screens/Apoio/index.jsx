Apoio

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity, useColorScheme
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../services/api';
import { Entypo, EvilIcons, Feather } from '@expo/vector-icons';
import EnderecoModal from '../../modal/PontoDeApoio/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Appearance } from 'react-native';

const Apoio = () => {
  const [locais, setLocais] = useState([]);
  const [filteredLocais, setFilteredLocais] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('');
 
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/pontosdeapoio');
        const dados = response.data;

        const dadosOrdenados = dados.sort((a, b) =>
          a.bairro.localeCompare(b.bairro),
        );

        await AsyncStorage.setItem(
          'dadosLocais',
          JSON.stringify(dadosOrdenados),
        );
        const dataHoraAtualizacao = new Date();
        const dataFormatada = format(dataHoraAtualizacao, 'dd/MM/yyyy HH:mm', {
          locale: ptBR,
        });
        await AsyncStorage.setItem('ultimaAtualizacao', dataFormatada);
        setUltimaAtualizacao(dataFormatada);

        setLocais(dadosOrdenados);
        setFilteredLocais(dadosOrdenados);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);

        try {
          const storedData = await AsyncStorage.getItem('dadosLocais');
          const storedUltimaAtualizacao = await AsyncStorage.getItem(
            'ultimaAtualizacao',
          );

          if (storedData && storedUltimaAtualizacao) {
            setLocais(JSON.parse(storedData));
            setFilteredLocais(JSON.parse(storedData));
            setUltimaAtualizacao(storedUltimaAtualizacao);
          }
        } catch (asyncStorageError) {
          console.error(
            'Erro ao obter dados do AsyncStorage:',
            asyncStorageError.message,
          );
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterLocais = () => {
      const filtered = locais.filter(
        (item) =>
          item.bairro.toLowerCase().includes(search.toLowerCase()) ||
          item.ponto_apoio.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredLocais(filtered);
    };

    filterLocais();
  }, [search, locais]);

  const handleEnderecoPress = (id) => {
    setIdSelecionado(id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleToggleFiltro = () => {
    setFiltroAtivo(!filtroAtivo);
    setFilteredLocais(
      filtroAtivo ? locais : locais.filter((local) => local.status === true),
    );
  };

  return (
    <View style={{...styles.pagina, backgroundColor: theme === "dark" ? "#000" : "#fff"}}>
      <View style={{...styles.titulo, backgroundColor: theme === "dark" ? "#333" : "#D9D9D9"  }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme === "dark" ? "#fff" : "#000" }}>
          PONTOS DE APOIO
        </Text>
      </View>

      <View style={styles.filtros}>
        <TouchableOpacity onPress={handleToggleFiltro} style={styles.botao}>
          {filtroAtivo ? (
            <Feather name="check-square" size={24} color="#555" />
          ) : (
            <Feather name="square" size={24} color="#555" />
          )}
          <Text style={{ marginLeft: 6, color: theme === "dark" ? "#fff" : "#000" }}>Abrigos abertos</Text>
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor={theme === "dark" ? "#fff" : "#000" }
            onChangeText={(text) => setSearch(text)}
            value={search}
            style={{ flex: 1, color: theme === "dark" ? "#fff" : "#000" }}
          />
          <EvilIcons name="search" size={20} color={theme === "dark" ? "#fff" : "#000"} />
        </View>
      </View>
      <View style={styles.atualizacao}>
        <Text style={{ fontSize: 13, color: theme === "dark" ? "#fff" : "#000" }}>
          Última atualização: {ultimaAtualizacao}
        </Text>
      </View>
      <View style={{...styles.listaTopo, backgroundColor: theme === "dark" ? "#333" : "#bbb" }}>
        <View style={styles.itemListaTopo}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}>
            Bairro
          </Text>
        </View>
        <View style={styles.itemListaTopo}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}>
            Nome do ponto de apoio
          </Text>
        </View>
        <View style={styles.itemListaTopo}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}>
            Endereço
          </Text>
        </View>
        <View style={styles.itemListaTopo}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}>
            Status
          </Text>
        </View>
      </View>

      <View style={styles.flatlist}>
        <FlatList
          data={filteredLocais}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.itensDaFlatlist,
                index % 2 === 0 ? {...styles.par, backgroundColor: theme === "dark" ? "#555" : "#D9D9D9"} : {...styles.impar, backgroundColor: theme === "dark" ? "#333" : "#D9D9D9" },
              ]}
            >
              <View style={styles.itemDaFlatlist}>
                <Text style={{ textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}>{item.bairro}</Text>
              </View>
              <View style={styles.itemDaFlatlist}>
                <Text style={{ textAlign: 'center',color: theme === "dark" ? "#fff" : "#000" }}> {item.ponto_apoio}</Text>
              </View>
              <View style={styles.itemDaFlatlist}>
                <TouchableOpacity onPress={() => handleEnderecoPress(item.id)}>
                  <Entypo name="location" size={35} color="orange" />
                </TouchableOpacity>
              </View>
              <View style={styles.itemDaFlatlist}>
                {item.status ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    Aberto
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    Fechado
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      </View>
      <EnderecoModal
        isVisible={modalVisible}
        onClose={handleModalClose}
        locais={locais}
        idSelecionado={idSelecionado}
      />
    </View>
  );
};

export default Apoio;
