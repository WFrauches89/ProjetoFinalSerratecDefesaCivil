import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
});
