import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { View } from '../components/Themed';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { SearchBar } from 'react-native-elements';
import style from '../styles/BooksScreen.style';
import { RootTabScreenProps } from '../types';


export default class App extends React.Component<RootTabScreenProps<'Books'>> {
  render() {
    const state = {
      search: ' ',
    };
  
    const updateSearch = (search: any) => {
      this.setState({ search });
    };
  
    const renderItem = ({ item, rating, kitchenType }: { item: any; rating: any; kitchenType: any; } ) => (
      <Item 
      title={ item.title }
      rating={ item.rating }
      kitchenType={ item.kitchenType }
      />
    );
    
    const Item = ({ title, rating, kitchenType }: { title: any, rating: any, kitchenType: any }) => (
      <View>
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

    type TYPES = [
      {
        id: any;
        title: any;
        rating: any;
        kitchenType: any;
      },
      {
        id: any;
        title: any;
        rating: any;
        kitchenType: any;
      },
      {
        id: any;
        title: any;
        rating: any;
        kitchenType: any;
      },
    ];

    const search = this.state

    const DATA: TYPES = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'SELECT nome FROM suamae',
        rating: 4.5,
        kitchenType: 'Brasileira',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Bar do José',
        rating: 5.0,
        kitchenType: 'Argentina',
      },
                                             
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Bar do Pedro',
        rating: 4.2,
        kitchenType: 'Mexicana',
      },
    ];

    return (
      <SafeAreaView style={style.container}>
       <SearchBar
        placeholder="Pesquisar..."
        onChangeText={updateSearch}
        value={search}
        platform="android"
        containerStyle={style.searchBar}
        inputContainerStyle={style.searchBarInput}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
     
    );
  }
}
