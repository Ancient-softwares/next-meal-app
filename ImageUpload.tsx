import * as React from 'react';
import {
	ActivityIndicator,
	Button,
	Image,
	StatusBar,
	Text,
	View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class App extends React.Component {
	state = {
		image: null,
		uploading: false,
	};

	render(): JSX.Element {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 20,
						marginBottom: 20,
						textAlign: 'center',
						marginHorizontal: 15,
					}}
				>
					Example: Upload ImagePicker result
				</Text>

				{this.maybeRenderControls()}
				{this.maybeRenderUploadingIndicator()}
				{this.maybeRenderImage()}

				<StatusBar barStyle="default" />
			</View>
		);
	}

	private maybeRenderUploadingIndicator = () => {
		if (this.state.uploading) {
			return <ActivityIndicator animating size="large" color="#0000ee" />;
		}
	};

	private maybeRenderControls = (): JSX.Element => {
		if (!this.state.uploading) {
			return (
				<View>
					<View style={{ marginVertical: 8 }}>
						<Button
							onPress={this.pickImage}
							title="Pick an image from camera roll"
						/>
					</View>
					<View style={{ marginVertical: 8 }}>
						<Button onPress={this.takePhoto} title="Take a photo" />
					</View>
				</View>
			);
		} else {
			return <View />;
		}
	};

	private maybeRenderImage = (): JSX.Element => {
		if (this.state.image) {
			return (
				<View
					style={{
						marginTop: 30,
						width: 250,
						borderRadius: 3,
						elevation: 2,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
					}}
				>
					<View
						style={{
							borderTopRightRadius: 3,
							borderTopLeftRadius: 3,
							overflow: 'hidden',
						}}
					>
						<Image
							source={{ uri: this.state.image }}
							style={{ width: 250, height: 250 }}
						/>
					</View>

					<Image
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
						source={{ uri: this.state.image }}
					/>
				</View>
			);
		} else {
			return <></>;
		}
	};

	private askPermission = async (failureMessage: string): Promise<void> => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status === 'denied') {
			alert(failureMessage);
		}
	};
	private askCameraPermission = async (
		failureMessage: string
	): Promise<void> => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status === 'denied') {
			alert(failureMessage);
		}
	};

	private takePhoto = async (): Promise<void> => {
		await this.askCameraPermission(
			'We need the camera permission to take a picture...'
		);
		let pickerResult: any = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		this.handleImagePicked(pickerResult);
	};

	private pickImage = async (): Promise<void> => {
		await this.askPermission(
			'We need the camera-roll permission to read pictures from your phone...'
		);

		let pickerResult: any = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		this.handleImagePicked(pickerResult);
	};

	private handleImagePicked = async (pickerResult: any): Promise<void> => {
		let uploadResponse: any, uploadResult: any;

		try {
			this.setState({ uploading: true });

			if (!pickerResult.cancelled) {
				uploadResponse = await uploadImageAsync(pickerResult.uri);
				uploadResult = await uploadResponse.json();
				console.log({ uploadResult });
				this.setState({ image: uploadResult.files.photo });
			}
		} catch (e) {
			console.log({ uploadResponse });
			console.log({ uploadResult });
			console.log({ e });
			alert('Upload failed, sorry :(');
		} finally {
			this.setState({ uploading: false });
		}
	};
}

async function uploadImageAsync(uri: string): Promise<Response> {
	let apiUrl: string = 'https://httpbin.org/post';

	// Note:
	// Uncomment this if you want to experiment with local server
	//
	// if (Constants.isDevice) {
	//   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
	// } else {
	//   apiUrl = `http://localhost:3000/upload`
	// }
	let uriArray: string[] = uri.split('.');
	let fileType: string = uriArray[uriArray.length - 1];

	let formData: FormData = new FormData();
	formData.append('photo', {
		uri,
		name: `photo.${fileType}`,
		type: `image/${fileType}`,
	});

	let options: Object = {
		method: 'POST',
		body: formData,
		mode: 'cors',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	};

	return fetch(apiUrl, options);
}
