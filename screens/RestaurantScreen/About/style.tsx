import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding:0,
      margin:0,
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 10,
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
      marginBottom: 5,
      fontSize: 16,
      color: '#963333',
    },
    carousel: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    description: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'grey',
      marginLeft: 20,
    },
    image: {
      width: '10vw',
      height: '10vh',
      borderRadius: 30
    },
    formsStyle: {
      padding:20,
    },
    tecoVermeio: {
      backgroundColor: 'Red',
      width: '100%',
      height: '1vh'
    }
});
  
export default styles;