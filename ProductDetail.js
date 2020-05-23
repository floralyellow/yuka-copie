import React, {Component} from 'react';
import {View, Text, Image, AsyncStorage} from 'react-native';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: false
        }
    }

    // Dès que le composant est chargé, j'alimente le state avec des données
    componentDidMount() {
        return fetch('https://world.openfoodfacts.org/api/v0/product/' +
            this.props.route.params.code + '.json')
            .then((response) => response.json())
            .then(async (responseJson) => {
                let noProducts =await AsyncStorage.getItem('nbProducts');
                let nbProducts = (await noProducts == null)? 1 : Number.parseInt((await noProducts),10)+1;
                if(typeof await nbProducts === 'number'){
                    AsyncStorage.setItem(
                        'products'+await nbProducts,
                        JSON.stringify(responseJson.product)
                    );
                    AsyncStorage.setItem(
                        'nbProducts',
                        JSON.stringify(await nbProducts)
                    );
                }
                this.setState({
                    product: responseJson.product,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        // Affiche un loader tant que l'API n'a.json pas répondu
        if (!this.state.product) {
            return (
                <View>
                    <Text>No Data</Text>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <Image style={{flex: 1, height: 150}} source={{uri: this.state.product.image_url}}/>
                    <Text style={{flex: 1, textAlign: 'center'}}>{this.state.product.product_name}</Text>
                </View>
            );
        }
    }
}
