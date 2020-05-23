import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode={"none"}>
            <HomeStack.Screen name="Home" component={Home}/>
        </HomeStack.Navigator>
    );
}

const SettingsStack = createStackNavigator();
function ProductsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="ProductList" component={ProductList} />
            <SettingsStack.Screen
                name="ProductDetail"
                component={ProductDetail}/>
        </SettingsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Products">
          <Tab.Screen name="Scanner" component={HomeStackScreen} />
          <Tab.Screen name="Products" component={ProductsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
