import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

const Modal = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible)
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={[styles.listTitle, { marginBottom: 10 }]}>
						{title}
					</Text>

					<View
						style={{
							alignItems: 'flex-start',
						}}
					>
						<Text style={styles.lilText}>{description}</Text>
					</View>
					<View style={[styles.row, { marginBottom: 15 }]}>
						<TouchableOpacity
							style={[
								styles.button,
								{ padding: 4, marginHorizontal: 6 },
							]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={[styles.modalText]}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default Modal
