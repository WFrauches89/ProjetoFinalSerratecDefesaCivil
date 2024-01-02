import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },

  containerPrincipal: {
    width: '96%',
    borderColor: '#e8e8e8',
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10.5,
    marginTop: 35,
    elevation: 10,
  },
  containerText: {
    fontSize: 33,
    fontWeight: 'bold',
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
   
  },

  Viewalerta: {
    width: '96%',
    // backgroundColor: '#e8e8e8',
    padding: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0.5,
  },
  Viewalerta2: {
    width: '100%',
    backgroundColor: '#e8e8e8',
    padding: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0.5,
    // backgroundColor: '#f08080'
  },
  textAlerta: {
    paddingHorizontal: 5,
    fontSize: 28,
    fontWeight: 'bold',

    color: '#666666',
  
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
    backgroundColor: '#f08080'
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
    marginTop: -15,
    marginRight: 10,
    gap: 10,
  },
  ladoDireito: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  botaoDataFlatList: {
    width: '65%',
    padding: 10,
    backgroundColor: '#ff8c00',
    borderRadius: 10,
  },
});
