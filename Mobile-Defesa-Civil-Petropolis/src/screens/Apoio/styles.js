import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    pagina: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        width: '95%',
        padding: 20,
        borderRadius: 20,
        marginTop: 40,
        elevation: 10,
    },
    filtros: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    botao: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        width: '40%',
        padding: 1,
        borderBottomWidth: 2,
        borderColor: '#ccc',
    },
    atualizacao: {
        marginTop: 7,
    },
    listaTopo: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#bbb',
        marginTop: 20,
        padding: 6,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,


    },
    itemListaTopo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        flex: 1,
        width: '95%',
    },
    itensDaFlatlist: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 8
    },
    par: {
        backgroundColor: '#ddd',
    },
    impar: {
        backgroundColor: '#ccc',
    },
    itemDaFlatlist: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
