import { StyleSheet, Dimensions } from 'react-native';

// const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    // backgroundColor: '#6495ed'
  },

  containerPrincipal: {
    width: '95%',
    borderColor: '#e8e8e8',
    borderRadius: 10,
    // backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3%',
    marginTop: '10%',
    marginBottom: '10%',
    elevation: 10,
    backgroundColor: '#7fffd4',
  },
  containerText: {
    fontSize: 33,
    fontWeight: 'bold',
    // backgroundColor: '#e8e8e8',
    padding: '3%',
  },
  containerText2: {
    fontSize: 20,
    marginRight: '18%',
    fontWeight: 'bold',
    backgroundColor: '#e8e8e8',
    padding: '2%',
    backgroundColor: '#006400'
   
  },
  containerPrincipal3: {
    flexDirection: 'row',
    borderColor: '#e04062',
    // backgroundColor: '#e8e8e8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
    marginTop: '1%',
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
    backgroundColor: '#006400'
  },
  containerImage: {
    width: '20%',
    borderRadius: 5,
    height: 50,
  },
});
