import React, { Component } from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { Card, Button } from "react-bootstrap";
import styles from "../styles/Books.style";

const DATA = [
{
	id: "1",
	title: "Data Structures",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "2",
	title: "STL",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "3",
	title: "C++",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "4",
	title: "Java",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "5",
	title: "Python",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "6",
	title: "CP",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "7",
	title: "ReactJs",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "8",
	title: "NodeJs",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "9",
	title: "MongoDb",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "10",
	title: "ExpressJs",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "11",
	title: "PHP",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
{
	id: "12",
	title: "MySql",
	rating: 4.5,
    kitchenType: 'Brasileira',
},
];

const Item = ({ title, rating, kitchenType }) => {
return (
	<View style={styles.item}>
		<Card style={{ 
          width: '22em', 
          border: 'none', 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center',
          }}>
          <Card.Img variant="top" src={require('../assets/images/example.jpeg')} />
          <Card.Body style={{ 
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
           }}>
            <Card.Title>{ title }</Card.Title>
            <Card.Text>
              Tipo de cozinha: { kitchenType }
            </Card.Text>
            <Card.Text>
              Nota: { rating } / 5.0
            </Card.Text>
            <Button variant="primary" style={{ marginRight: 5 }}>Reservar</Button>
          </Card.Body>
        </Card>
	</View>
);
};

const renderItem = ({ item, rating, kitchenType }) => <Item title={ item.title }
rating={ item.rating }
kitchenType={ item.kitchenType }
/>;
class Search extends Component {
constructor(props) {
	super(props);
	this.state = {
	loading: false,
	data: DATA,
	error: null,
	searchValue: "",
	};
	this.arrayholder = DATA;
}

searchFunction = (text) => {
	const updatedData = this.arrayholder.filter((item) => {
	const item_data = `${item.title.toUpperCase()})`;
	const text_data = text.toUpperCase();
	return item_data.indexOf(text_data) > -1;
	});
	this.setState({ data: updatedData, searchValue: text });
};

render() {
	return (
	<SafeAreaView style={styles.container}>
		<SearchBar
		placeholder="Search Here..."
		lightTheme
		platform='android'
		round
		value={this.state.searchValue}
		onChangeText={(text) => this.searchFunction(text)}
		autoCorrect={false}
		/>
		<FlatList
		data={this.state.data}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
		/>
	</SafeAreaView>
	);
}
}

export default Search;