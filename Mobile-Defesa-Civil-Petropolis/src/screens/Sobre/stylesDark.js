import { StyleSheet, Dimensions, Image } from 'react-native';

const width = Dimensions.get('screen').width;

export const stylesDark = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'black',
  },
  boxTitulo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666',
    width: '95%',
    height: '11%',
    borderRadius: 20,
    marginTop: 40,
    elevation: 10,
  },

  titulo: {
    fontSize: 30,
    color:"white",
  },
  boxImages: {
    width: '95%',
    height: '20%',
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor:'red',
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
    backgroundColor: '#666',
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
    color:'white'
  },
  informacoes: {
    width: '100%',
    alignItems: 'center',
    marginBottom:'5%',
  },
  informacao: {
    marginVertical: 4,
    fontSize:15,
    color:'white',
  },
  links:{
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom: 11,
  }
});
