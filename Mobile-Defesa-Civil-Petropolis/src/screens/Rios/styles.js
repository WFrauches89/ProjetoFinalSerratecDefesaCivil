import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    backgroundColor: '#D9D9D9',
    width: '95%',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '10%',
    elevation: 10,
  
  },
  filtro: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '3%',
  },
  pesquisa: {
    width: '40%',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  cabecalhoLista: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    width: '95%',
    marginTop: '3%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  itemCabecalho: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  lista: {
    width: '95%',
    maxHeight: '66.2%',
    
  },
  linhalista: {
    flexDirection: 'row',
    marginBottom:1,
    
  },
  itemLista: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  par: {
    backgroundColor: '#F3F3F3',

  },
  impar: {
    backgroundColor: '#D9D9D9',
  },
  atencao: {
    backgroundColor: '#FFC000',
    flex:1.3
  },
  alerta: {
    backgroundColor: '#EC7C30',
    flex:1.3
  },
  vigilancia: {
    backgroundColor: '#70AD47',
    flex:1.3
  },
  rede:{
    backgroundColor:"#999",
    flex:1.3
  },
});

export default styles;
