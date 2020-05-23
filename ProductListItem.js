import React, {Component} from 'react';
import { Text, Image, TouchableOpacity  } from 'react-native';

export default class Item extends Component{
    _onPress(item){
        console.log(this.props);
        this.props.navigation.navigate('ProductDetail',
            { code: item.code }
        )
    }
    render(){
        return (
            <TouchableOpacity
                style={{flex: 1, marginTop:20,flexDirection:'row'}}
                onPress={()=> this._onPress(this.props.item)}>
                <Image style={{flex:1,height: 150}} source={{uri : this.props.item.image_url}}/>
                <Text style={{flex:2, padding : 15}}>{this.props.item.product_name}</Text>
            </TouchableOpacity >
        );
    }
}
