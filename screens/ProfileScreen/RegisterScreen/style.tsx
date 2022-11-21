import { Dimensions, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
		borderRadius: 10,
		color: '#000'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	formInput: {
		fontSize: 16,
		marginVertical: '5%',
		width: Dimensions.get('window').width * 0.8,
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#963333'
	},

	progressBar: {
		width: 375,
		height: 20,
		backgroundColor: 'rgba(242, 60, 53, 0.4)',
		marginBottom: 40,
		borderRadius: 10,
		
	},

	progressBarDiv: {
		width: '25%',
		height: '100%',
		backgroundColor: 'rgb(250, 36, 27)',
		borderRadius: 10
	}
})

export default styles
