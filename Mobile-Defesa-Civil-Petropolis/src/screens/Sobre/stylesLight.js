import { StyleSheet, Dimensions, Image } from 'react-native';

const width = Dimensions.get('screen').width;

export const stylesLight = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  boxTitulo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    width: '95%',
    height: '11%',
    borderRadius: 20,
    marginTop: 40,
    elevation: 10,
  },

  titulo: {
    fontSize: 30,
  },
  boxImages: {
    width: '95%',
    height: '20%',
    marginTop: 20,
    flexDirection: 'row',
  },
  boxImage: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  corpo: {
    width: '95%',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginBottom:5,
  },
  boxDescricao: {
    alignItems: 'center',
    padding:'5%',
    width: '100%',
    marginVertical: '5%',
  },
  textoDescricao:{
    fontSize:18,
  },
  informacoes: {
    width: '100%',
    alignItems: 'center',
    marginBottom:'5%',
  },
  informacao: {
    marginVertical: 4,

  },
  links:{
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom: 11,
  }
});
