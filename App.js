import React, { Component} from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider } from 'react-redux';
import store from './src/redux/store'


import LoginScreen from './src/screen/auth/Login'
import ProductScreen from './src/screen/product/Products'
import HomeScreen from './src/screen/home/Home'
import AddProductScreen from './src/screen/product/AddProduct'
import EditProductScreen from './src/screen/product/EditProduct'


// const tabNavigator = createBottomTabNavigator(
//   {
//     Home: HomeScreen,
//   }
// )
const homeNavigator = createStackNavigator(
  { 
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: null,
      }
    },
    Login:
    {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      }
    },
    Product: ProductScreen,
    AddProduct: AddProductScreen,
    EditProduct: EditProductScreen,

  },
  {
    initialRouteName: 'Login',
  }
)
const AppContainer = createAppContainer(homeNavigator)
function App (){
  return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
  )
} 

export default App