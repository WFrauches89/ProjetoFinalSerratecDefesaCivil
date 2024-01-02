import React from 'react';
import { View, Text, TouchableOpacity, Modal,Linking } from 'react-native';
import styles from './styles';
import { EvilIcons } from '@expo/vector-icons';

const EnderecoModal = ({ isVisible, onClose, locais, idSelecionado }) => {
  const enderecoSelecionado = locais.find(item => item.id === idSelecionado)?.endereco || '';
  const linkMaps = locais.find(item => item.id === idSelecionado)?.localizacao || '';
  const telefoneSelecionado = locais.find(item => item.id === idSelecionado)?.numerosTelefone || [];

  const numerosTelefoneString = telefoneSelecionado.map(telefone => telefone.numero).join(', ');

  

  const openLink = () => {
    const url = linkMaps; // Replace with your actual URL
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };
  
  return (
   
      <Modal  visible={isVisible} onRequestClose={onClose} transparent={true} >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{enderecoSelecionado}</Text>
            <Text style={{fontSize: 18}}>Telefone:{numerosTelefoneString}</Text>
            <TouchableOpacity  style={styles.bottons} onPress={openLink}>
            <EvilIcons name="location" size={40} color="blue" />
              <Text style={{fontSize:18}}>Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style ={styles.closeButton} onPress={onClose}>
              <Text style={{fontSize:18}} >Fechar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        </Modal>
  );
};
export default EnderecoModal;