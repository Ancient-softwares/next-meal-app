import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
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
	cardImg: {
		flex: 1,
		borderRadius: '17%',
		width: '100%',
		height: '100%'
	},
	card: {
		width: '22em',
		border: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 19,
		fontFamily: 'ionicons'
	},
	searchBar: {
		backgroundColor: 'none'
	},
	searchBarInput: {
		backgroundColor: 'none',
		color: 'black',
		fontSize: 20
	},
	LineCard: {
		color: 'red',
		marginLeft: -100,
		marginRight: -100,
		opacity: 1
	},
	buttonReserv: {
		backgroundColor: 'red',
		border: 'none',
		marginTop: 16,
		marginLeft: -91,
		marginRight: 105
	},
	textCardPosition: {
		marginLeft: -94
	},
	subtitle: {
		marginBottom: 5,
		fontSize: 18,
		color: '#963333',
		fontWeight: 'bold'
	}
})
