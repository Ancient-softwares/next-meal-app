import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		padding: 0,
		margin: 0,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		marginVertical: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'ionicons'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	subtitle: {
		marginLeft: 20,
		marginBottom: 5,
		fontSize: 22,
		color: '#963333',
		fontFamily: 'ionicons'
	},
	carousel: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	description: {
		fontSize: 14,
		fontStyle: 'italic',
		fontFamily: 'ionicons',
		color: 'grey',
		marginLeft: 20
	},
	image: {
		width: '10vw',
		height: '10vh',
		borderRadius: 30
	},
	formsStyle: {
		padding: 20 /*rgb(239 239 239);*/
	},
	tecoVermeio: {
		backgroundColor: 'Red',
		width: '100%',
		height: '1vh'
	},
	PositionImgRestaurant: {
		marginLeft: -64
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
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
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: '#F194FF'
	},
	buttonClose: {
		backgroundColor: '#2196F3'
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center'
	},
	rowList: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginHorizontal: '10%',
		marginTop: '15%',
		marginBottom: '10%'
	},
	cardImg: {
		flex: 1,
		borderRadius: 38
	},
	card: {
		width: '22em',
		border: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 19,
		fontFamily: 'ionicons'
	},
	LineCard: {
		color: 'red',
		marginLeft: -100,
		marginRight: -100,
		opacity: 1
	},
	textCardPosition: {
		marginLeft: -94
	},
	nameCategory: {
		marginLeft: 38
	},
	spaceCategory: {
		width: 120
	}
})

export default styles
