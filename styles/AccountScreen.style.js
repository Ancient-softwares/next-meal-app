import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    subtitle: {
        marginVertical: 30,
        fontSize: 16,
        color: '#963333',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingVertical: 15,
        paddingLeft: 30,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      text: {
        fontSize: 14,
        marginVertical: 5,
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
      accountIcon: {
        paddingBottom: 10,
      },
      message: {
        fontSize: 16,
        marginVertical: '5%',
      },
      modalInput: {
        fontSize: 16,
        marginVertical: '5%',
        width: Dimensions.get('window').width * 0.8,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#963333',
      }
});
