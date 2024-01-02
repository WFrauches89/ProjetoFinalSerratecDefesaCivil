import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image, useColorScheme } from 'react-native';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/core';
import * as openAnything from 'react-native-openanything';
import imgpdf from '../../../assets/imgpdf.png';
import { Appearance } from 'react-native';

export default function Cartilhas({ navigation }) {
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
      <ScrollView style={{...styles.container, backgroundColor: theme === "dark" ? "#000" : "#fff"}}>
        <View style={{...styles.containerPrincipal, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}>
          <Text style={{...styles.containerText, color: theme === "dark" ? "#fff" : "#000"}}>Cartilhas</Text>
        </View>

        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3,backgroundColor: theme === "dark" ? "#333" : "#e8e8e8" }}
            title="PDF 01"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/PLANO_DE_RESILIENCIA_INDIVIDUAL.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000" }}>
              Individual Resilience Plan - PRI
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 02"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_risco_de_inundacao.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000" }}>
              Cuidados e Prevenção nas chuvas {'\n'} - Risco de Inundação
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 03"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_cuidados_em_piscinas_e_cachoeiras.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000" }}>
              Cuidados em Piscinas e {'\n'}Cachoeiras
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 04"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_contra_desastres_naturais.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000"}}>Contra Desastres Naturais</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 01"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_incendios_florestais_petropolis_rj.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000"}}>
              Incêndios Florestais Petrópolis
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 01"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_risco_de_inundacao.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000"}}>
              Água é um bem para todos Petrópolis - RJ
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPrincipal2}>
          <TouchableOpacity
            style={{...styles.containerPrincipal3, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8"}}
            title="PDF 01"
            onPress={() =>
              openAnything.Pdf(
                'https://www.petropolis.rj.gov.br/pmp/phocadownload/defesa-civil/cartilhas/cartilha_dc_comercio.pdf',
              )
            }
          >
            <Image source={imgpdf} style={styles.containerImage} />
            <Text style={{...styles.containerText2, backgroundColor: theme === "dark" ? "#333" : "#e8e8e8", color:theme === "dark" ? "#fff" : "#000"}}>
              Cuidados e Prevenção nas Chuvas para o Comércio
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
