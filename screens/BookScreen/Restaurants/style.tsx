import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    cardImg: {
      flex: 1,
    },
    card: {
      width: '22em', 
        border: 'none', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    searchBar: {
      backgroundColor: 'none',
    },
    searchBarInput: {
      backgroundColor: 'none',
      color: 'black',
      fontSize: 20,
    },
  });