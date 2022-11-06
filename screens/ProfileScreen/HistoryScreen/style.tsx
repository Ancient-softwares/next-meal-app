import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
		marginVertical: 60,
		borderRadius: 10,
		backgroundColor: '#fff'
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
	PositionImgRestaurant: {
		marginLeft: -95
	},
	subtitle: {
		marginLeft: 20,
		marginBottom: 5,
		fontSize: 22,
		color: '#963333',
		fontFamily: 'ionicons'
	},
	description: {
		fontSize: 14,
		fontStyle: 'italic',
		fontFamily: 'ionicons',
		color: 'grey',
		marginLeft: 20
	}
})

export default styles
