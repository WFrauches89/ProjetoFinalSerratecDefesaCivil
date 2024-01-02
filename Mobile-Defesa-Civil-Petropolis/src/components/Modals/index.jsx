import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from 'react-native';

const ModalComum = ({ tipoMensagem, mensagem, onClose, conf }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
        >
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>
                {tipoMensagem}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Text style={{ fontSize: 18, color: 'blue' }}>X</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 22 }}>{mensagem}</Text>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              {conf ? (
                <View style={{ flexDirection: 'row' }}>
                  <Button title="CONFIRMAR" onPress={() => conf(true)} />
                  <Button title="CANCELAR" onPress={() => conf(false)} />
                </View>
              ) : (
                <Button title="OK" onPress={onClose} />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComum;
