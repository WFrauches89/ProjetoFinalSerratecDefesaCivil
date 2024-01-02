import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView, useColorScheme
} from 'react-native';
import { styles } from './styles';
import { Card } from 'react-native-elements';
import { Linking } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/core';
import ModalComum from '../../components/Modals/index';
import api from '../../services/api';
import { Appearance } from 'react-native';

export default function Alertas({ navigation }) {
  useFocusEffect(() => {
    navigation.openDrawer();
  });

  const [data, setData] = useState([]);

  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    console.log(scheme.colorScheme);
  })

  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    if (loading) return;

    setloading(true);

    const { data } = await api.get(`/informativo/listarInformes`);
    const filtro = data.filter((item) => item.ativo !== false);

    const ordem = filtro.sort((a, b) =>
      a.dataPostagem > b.dataPostagem
        ? -1
        : a.dataPostagem < b.dataPostagem
        ? 1
        : 0,
    );

    setData([...ordem]);
    setPage(page + 1);
    setloading(false);
    console.log(data.dataEvento);
  }

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
  
  function ListItem({ data, setData, setPage, setloading, navigation }) {
    const [showModal, setShowModal] = useState(false);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const verMais = async () => {
      openModal();
    };
  
    return (
      <View style={{...styles.listItem, backgroundColor: theme === "dark" ? "#222" : "#e0e0e0"}}>
        <View style={styles.ladoEsquerdo}>
          <Text style={{...styles.listText, color: theme === "dark" ? "white" : "#666666"}}>{data.titulo}</Text>
          <Text style={{ fontSize: 15, textAlign: 'justify', color: theme === "dark" ? "white" : "#000" }}>
            {truncateText(data.descricao, 100)}
          </Text>
  
          {data.dataEvento !== null && data.dataEvento !== '' && (
            <View style={styles.botaoDataFlatList}>
              <Text style={styles.dataEvento}>
                {format(new Date(data.dataEvento), 'dd/MM/yyyy')}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.ladoDireito}>
          <Text style={{ flex: 1, marginTop: -10, color: theme === "dark" ? "white" : "#666666" }}>
            {data.dataPostagem}
          </Text>
          <TouchableOpacity onPress={verMais}>
            <Text style={{ color: '#138496', fontWeight: 'bold', fontSize: 18 }}>
              Ver mais
            </Text>
          </TouchableOpacity>
        </View>
        {showModal && (
          <ModalComum
            tipoMensagem="Ver mais"
            mensagem={truncateText(data.descricao)}
            onClose={closeModal}
          />
        )}
      </View>
    );
  }

  return (
    <View style={{...styles.container, backgroundColor: theme === "dark" ? "#000" : "#fff"}}>
      <Card containerStyle={{...styles.containerPrincipal,  backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
        <Text style={{...styles.containerText, color: theme === "dark" ? "#fff" : "#000"}}>Alertas e Avisos</Text>
      </Card>

      <View style={{...styles.flatList, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
        <View style={{...styles.Viewalerta, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
          <Text style={{...styles.textAlerta, color: theme === "dark" ? "white" : "#666666"}}> </Text>
        </View>
        <View style={{...styles.Viewalerta2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ListItem
                data={item}
                setData={setData}
                setPage={setPage}
                setloading={setloading}
                navigation={navigation}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}


