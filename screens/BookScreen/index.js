import React from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { Card, Button } from "react-bootstrap";
import styles from "./style";
import axios from "axios";

const DATA = Array();

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
		console.log(response.data)
		console.table(response.data[0])
		console.table(response.data[1])
		console.table(response.data[2])

		/* for (let i = 0; i < response.data[0].length; i++) {
			DATA.push({
				id: i,
				title: response.data[0][i].nomeRestaurante,
				type: response.data[1][i].tipoRestaurante,
				rating: response.data[2][i].notaAvaliacao,
			})
		} */

		response.data.forEach(item => {
			DATA.push({
				id: item.idRestaurante,
				title: item.nomeRestaurante,
				type: item.tipoRestaurante,
				rating: item.notaAvaliacao,
			})
		})

		console.table(DATA)
		return JSON.parse(JSON.stringify(response.data))
	})
	.catch(err => console.error(err))
})()

function Item({title, rating, type}) {
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
            Tipo de cozinha: {type || 'Não informado'}
          </Card.Text>
          <Card.Text>
            Nota: {rating || 0} / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Reservar</Button>
        </Card.Body>
      </Card>
    </View>
  );
}

function renderItem(item) {
	console.table(item.item)
	console.log(item.item.type)

  return <Item title={item.item.title}
    rating={item.item.rating}
    type={item.item.type} />;
}

export default function BookScreen({ navigation }) {
	const [search, setSearch] = React.useState("");
	const [data, setData] = React.useState(DATA);
	const arrayholder = DATA;

	function updateSearch(search) {
		setSearch(search);
		searchFunction(search);
	}

	function searchFunction(text) {
		const updatedData = arrayholder.filter((item) => {
			const itemData = `${item.title.toString().toLowerCase()})`;
			const textData = text.toString().toLowerCase();
			
			return itemData.indexOf(textData) > -1;
		});

		setData({ data: updatedData, searchValue: text });
	};

	  return (
		<SafeAreaView style={styles.container}>
		  <SearchBar
			placeholder="Pesquisar restaurantes..."
			lightTheme
			platform='android'
			round
			value={search}
			onChangeText={(text) => updateSearch(text)}
			autoCorrect={false}
			blurOnSubmit={true}
			autoFocus={true}
			style={{
				width: '72vw',
			}}
		  />
		  <FlatList
			data={DATA}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			scrollEnabled={true}
			scrollIndicatorInsets={0,0,0,0}
		  />
		</SafeAreaView>
	);
}
