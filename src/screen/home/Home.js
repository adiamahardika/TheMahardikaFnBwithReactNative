import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, FlatList, Picker, Image } from 'react-native';
import { Container, View, Card, Content, Footer, FooterTab, Button, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { getAllProduct, searchProduct, filterProduct } from '../../redux/actions/product'
import {getAllCategory} from '../../redux/actions/category'
import { addCart } from '../../redux/actions/cart'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
class HomeScreen extends Component{
    state = {
        product:'',
        category:''
      }
    
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: '#e91e63',
          },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount(){
        if(!AsyncStorage.getItem('isAuth')){
            this.props.navigation.navigate('Login')
        }
        this.getAllProduct()
        this.props.dispatch(getAllCategory())

    }
    onLogout(){
        AsyncStorage.removeItem('user-id');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('isAuth');
        this.props.navigation.navigate('Login');
    }
    async getAllProduct () {
        await this.props.dispatch(getAllProduct())
    }

    onRefreshing = () => {
    this.getAllProduct();
    }
    searchProduct = (event) => {
    this.setState({ product: event });
    this.props.dispatch(searchProduct(event))
    }
    filterProduct = (event) => {
    this.setState({category: event});
    this.props.dispatch(filterProduct(event));
    }
    parseToRupiah(number)
    {
      var rupiah = '';		
      var numberrev = number.toString().split('').reverse().join('')
      for(var i = 0; i < numberrev.length; i++) if(i%3 == 0) rupiah += numberrev.substr(i,3)+'.'
      return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
    }

    async onAddCart (item){
      const cart = this.props.cart
      let i
      cart.map(cart => {
        if (cart.id === item.id) {
          i = 0
          return alert('Product have been added')
        }
        return item
      })
  
      if (i !== 0) {
        const InitialTotal = this.props.total
        const product = item
        item.qty = 1
        item.total = InitialTotal + product.price
        await this.props.dispatch(addCart(item))
      }
    }
    renderRow = ({item}) => {
    return(
        <Card style={{width:165, flex: 1, marginBottom: 5, marginRight:5, borderBottomWidth: 2, borderLeftWidth:1, borderBottomColor: "#e91e63", borderLeftColor:"#e91e63"}}>
        <Image source={{uri: item.image}} style={{height: 165, flex: 1}} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 14, marginLeft: 10, marginBottom: 5, color: '#E91E63' }}>{item.category}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 18, marginLeft: 10, marginBottom: 5, color: '#4285f4' }}>{item.name}</Text>
            <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 5 }}>{this.parseToRupiah(item.price)}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>Stock: {item.quantity}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 100, backgroundColor:'#4285f4', padding:5, borderRadius:25, marginBottom: 5 }} >
                    <Text style={{ fontSize: 14, color: "white" }} onPress={()=> this.onAddCart(item)}>Add Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Card>
    )
    }
    render(){
        const {products, categories} = this.props
        return(
            <Container>
            <View searchBar rounded containerStyle={{ backgroundColor: '#e91e63', borderWidth: 1, borderRadius: 5 }}>
            <Item>
            <Input placeholder="Search" onChangeText={this.searchProduct} />
            </Item>
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
            }} selectedValue={this.state.category}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
              style={{
                backgroundColor: '#E91E63',
                borderRadius: 25,
                width: 100,
                padding: 3
              }}
              onPress={()=> this.filterProduct('')}
              >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'sans-serif-condensed',
                  color: 'white',
                }}>
                All
              </Text>
              </TouchableOpacity>

              {categories.map((category, index) => 
              <TouchableOpacity
              style={{
                backgroundColor: '#E91E63',
                borderRadius: 25,
                width: 100,
                padding: 5,
                marginLeft: 5
              }}
              selectedValue={this.state.category} onPress={()=> this.filterProduct(category.id)}
              >
              <Text
              ellipsizeMode='tail' numberOfLines={1}
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'sans-serif-condensed',
                  color: 'white',
                }}>
                {category.name}
              </Text>
              </TouchableOpacity>)}
              </ScrollView>
            </View>
            <Content>
            <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
              <FlatList 
                  numColumns={2}
                  data={products}
                  renderItem={this.renderRow}
                  // refreshing={products.isLoading}
                  // onRefresh={this.onRefreshing}
                  keyExtractor={(item) => item.id.toString()}
              />
            </View>
            </Content>
            <Footer>
            <FooterTab style={{backgroundColor:'#4285f4'}}>
                <Button onPress={() => this.props.navigation.navigate('Home')}>
                  <Icon name='home' size={30} color='white'/>
                <Text style={{ color: "white" }}>Home</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Product')}>
              <Icon name='settings' size={30} color='white'/>
                <Text style={{  color: "white" }}>Manage</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Cart')}>
              <Icon name='cart' size={30} color='white'/>
                <Text style={{ color: "white" }}>Cart</Text>
              </Button>
              <Button onPress={this.onLogout.bind(this)}>
                <Icon name='logout' size={30} color='white'/>
                <Text style={{ color: "white" }}>Logout</Text>
              </Button>
            </FooterTab>
          </Footer>
          </Container>
        )
    }
}
const styles = StyleSheet.create({
    containerStyle:{
        color: '#e91e63',
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    stackHomeStyle:{
        backgroundColor: '#e91e63', 
        padding: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 335, 
        marginTop: 20
    }
})
const mapStateToProps = (state) => {
    return {
      products: state.products.products,
      categories: state.category.categories,
      cart: state.cart.cart,
      total: state.cart.total
    }
  }
export default connect(mapStateToProps)(HomeScreen)