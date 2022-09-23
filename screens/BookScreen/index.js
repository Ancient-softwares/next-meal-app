import React from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { Card, Button } from "react-bootstrap";
import styles from "./style";
import axios from "axios";

const DATA = [
	{
		id: "1",
		title: "Data Structures",
		type: 'Brasileira',
		rating: 4.5,
	},
];

(async function getRestaurants() {
	await axios({
		method: 'get',
		url: 'http://localhost:8000/api/restaurantes',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	})
	.then(response => {
		console.table(response.data)
		response.data.forEach((element) => {
			console.log(element)

			DATA.push({
				id: element.idRestaurante,
				title: element.nomeRestaurante,
				type: element.tipoCozinha || 'teste',
				rating: element.notaRestaurante || 0,
			})
		})

		return JSON.parse(JSON.stringify(response.data))
	})
	.catch(err => console.error(err))
})()

function Item({title}, {rating}) {
  return (
    <View style={styles.item}>
      <Card style={{
        width: '22em',
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Card.Img variant="top" src={require('../../assets/favicon.png')} />
        <Card.Body style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Tipo de cozinha: bah
          </Card.Text>
          <Card.Text>
            Nota: {rating} / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Reservar</Button>
        </Card.Body>
      </Card>
    </View>
  );
}

function renderItem(item) {
  return <Item title={item.title}
    rating={item.rating}
    kitchenType={item.type} />;
}
class BookScreen extends React.Component {
	constructor({props}, {navigation}) {
		super(props);
		this.state = {
		loading: false,
		data: DATA,
		error: null,
		searchValue: "",
		};
		this.arrayholder = DATA;
	}

	searchFunction(text) {
		const updatedData = this.arrayholder.filter((item) => {
		const item_data = `${item.title.toString().toLowerCase()})`;
		const text_data = text.toString().toLowerCase();
		return item_data.indexOf(text_data) > -1;
		});
		this.setState({ data: updatedData, searchValue: text });
	};

	render() {
		return (
		<SafeAreaView style={styles.container}>
			<SearchBar
			placeholder="Pesquisar restaurantes..."
			lightTheme
			platform='android'
			round
			value={this.state.searchValue}
			onChangeText={(text) => this.searchFunction(text)}
			autoCorrect={false}
			blurOnSubmit={true}
			autoFocus={true}
			style={{
				width: '72vw',
			}}
			/>
			<View>
				<FlatList
				data={this.state.data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				scrollEnabled={true}
				/>
			</View>
		</SafeAreaView>
		);
	}
}

export default BookScreen;