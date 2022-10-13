import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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
    subtitle: {
      marginLeft: 20,
      marginVertical: 30,
      marginBottom: 5,
      fontSize: 16,
      color: '#963333',
    },
    carousel: {
      flex: 1,
      borderRadius:60,
      padding:15,
    },
    description: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'grey',
      marginLeft: 20,
      marginBottom: 40,
    },
    lineStyle: {
      color: 'red',
      opacity: .70,
      marginLeft: 30,
      marginRight: 30
    },
    navHome: {
      background: '#963333',
      height: 250,
      alignItems: 'center',
    },
    nameCategory: {
       marginLeft: 38, 
    },
    spaceCategory: {
      width: 120
    },
    img:{
      width:200
    }
});
  