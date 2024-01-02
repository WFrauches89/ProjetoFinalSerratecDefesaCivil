import { StyleSheet, Dimensions } from 'react-native';


const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    // marginTop: 35,
  },

  botao: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#ff8c00',
    borderRadius: 18,
    elevation: 10,
    width: '45%',
    height: '10%',
    left: '55%',
    padding: 10,
    shadowColor: '#000',
    zIndex: 99,
  },
  textobotao: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    margin: 4,
  },

  meteorologia: {
    width: '96%',
    height: '35%',
    borderRadius: 10,
    // backgroundColor: '#a9a9a9',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10.5,
    marginTop: 35,
  },

  flatList: {
    flex: 1,
    width: '96%',
    borderRadius: 7,
    marginTop: 30,
    color: 'red',
    marginBottom: 10,
    // backgroundColor: '#e8e8e8',
    alignItems: 'center',
    // backgroundColor: '#f08080'
  },

  Viewalerta: {
    width: '96%',
    height: '18%',
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  Viewalerta2: {
    width: '100%',
    backgroundColor: '#e8e8e8',
    padding: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 45,
   
  },
  textAlerta: {
    paddingHorizontal: 5,
    fontSize: 28,
    fontWeight: 'bold',
    // color: '#666666',
  },
  listItem: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    // padding: 30,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginBottom: 3,
    flexDirection: 'row',
    textAlign: 'justify',
   
  },
  listText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#666666',
  },

  dataEvento: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  ladoEsquerdo: {
    flex: 6,
    flexDirection: 'column',
    textAlign: 'justify',
    marginTop: -16,
    marginRight: 10,
    gap: 10,
    
  },
  ladoDireito: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: '#4b0082'
  },

  botaoDataFlatList: {
    // flex: 1,
    width: '65%',
    padding: 10,
    backgroundColor: '#ff8c00',
    borderRadius: 10,
  },
});
