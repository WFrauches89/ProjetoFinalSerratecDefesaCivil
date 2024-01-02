import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  innerContainer: {
    width: '85%',
    height: '30%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
    justifyContent: "space-between"

  },
  closeButton: {
    color: 'black',
    backgroundColor: '#D9D9D9',
    borderRadius: 7,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    padding: 7


  },
  bottons: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 7,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
    elevation: 3

  }
})

export default styles;