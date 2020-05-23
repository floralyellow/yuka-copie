import React, {Component} from 'react';
import { SafeAreaView, FlatList, Text, AsyncStorage  } from 'react-native';
import Item from "./ProductListItem";


export default class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: false
        }
    }
    displayData = async ()=>{
        try{
            let dataKeys = (await AsyncStorage.getAllKeys()).filter(
                dataKey => dataKey !== 'nbProducts'
            );
            let finalData = [];
            let data = (await AsyncStorage.multiGet(await dataKeys)).map(
                dataKeys =>  {
                    finalData.push(
                        JSON.parse(dataKeys.filter(
                        datas => {
                            return new RegExp('^products').exec(datas) == null
                        })[0])
                    )
                }
            );
            return (await finalData != null && await finalData !== [] )?
                await finalData:false;
        }
        catch(error){
            alert(error)
        }
    };
    async componentDidMount(){
        this.setState({
            products : await this.displayData()
        });
    }
    render(){
        if(!this.state.products || typeof this.state.products === "PromiseConstructor"){
            return(
                <SafeAreaView style={{flex: 1, padding: 20}}>
                    <Text>No data</Text>
                </SafeAreaView>
            )
        }
        else{
            return(
                <SafeAreaView style={{flex: 1, paddingTop:20}}>
                    <FlatList
                        data={this.state.products}
                        renderItem={({item}) =>
                            <Item item={item}
                                  navigation={this.props.navigation} />}
                        keyExtractor={({id}, index) => id}
                    />
                </SafeAreaView>
            );
        }
    }
}
