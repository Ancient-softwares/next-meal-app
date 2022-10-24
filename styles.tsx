import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	title: {
		color: '#000',
		fontSize: 25,
		textAlign: 'center',
		marginTop: 25,
		marginBottom: 10,
	},

	listTitle: {
		fontSize: 24,
		textAlign: 'center',
	},

	textInputs: {
		borderWidth: 1,
		borderColor: '#000',
		color: '#000',
		borderRadius: 40,
		paddingLeft: 25,
		height: 60,
	},

	answer: {
		color: '#000',
		fontSize: 25,
		textAlign: 'center',
		marginTop: 30,
	},
	lilMargin: {
		margin: 15,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#ddd',
		padding: 10,
		marginVertical: 10,
		marginHorizontal: 15,
		borderRadius: 10,
	},
	item: {
		backgroundColor: '#ddd',
		padding: 5,
		paddingVertical: 10,
		marginVertical: 5,
		marginHorizontal: 15,
		borderRadius: 10,
	},
	image: {
		width: '75%',
		height: 235,
	},
	bgimage: {
		height: '100%',
		width: '100%',
	},

	headerText: {
		fontSize: 16,
		textAlign: 'center',
		margin: 10,
		fontWeight: 'bold',
	},

	headStyle: {
		height: 50,
		backgroundColor: '#f1f8ff',
		alignContent: 'center',
	},
	cellStyle: {
		margin: 10,
		textAlign: 'center',
		height: 40,
	},

	rowText: {
		textAlign: 'center',
		margin: 10,
	},

	row: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},

	lilText: {
		fontSize: 16,
		textAlign: 'center',
		margin: 10,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
})

export default styles
