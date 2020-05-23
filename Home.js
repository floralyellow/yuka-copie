import React, {useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductDetail from "./ProductDetail";

export default function Home({ navigation } ){
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        navigation.navigate('Products',{
            screen : 'ProductDetail',
            params: { code: data }
        });
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{flex:1}}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={{flex:1}}
            />
        </View>
    );
}
