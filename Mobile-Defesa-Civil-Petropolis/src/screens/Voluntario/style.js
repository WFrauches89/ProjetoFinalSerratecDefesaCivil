import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  topo: {
    width: '100%',
    height: (578 / 768) * width,
  },
  title: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    padding: 40,
    lineHeight: 26,
    color: '#000000',
    fontWeight: 'bold',
  },
  botao: {
    position: 'absolute',
    marginHorizontal: '10%',
    backgroundColor: '#3ED814',
    borderRadius: 18,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 30,
    bottom: 40,
  },
  textStyle: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 28,

    lineHeight: 26,
    color: '#000000',
    fontWeight: 'bold',
  },
});
