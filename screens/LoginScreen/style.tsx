import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginVertical: 60,
      borderRadius: 10,
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
    formInput: {
      fontSize: 16,
      marginVertical: '5%',
      width: Dimensions.get('window').width * 0.8,
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#963333',
    },
});

export default styles