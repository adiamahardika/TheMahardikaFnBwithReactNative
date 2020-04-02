import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, FlatList, Picker, Image } from 'react-native';
import { Container, View, Card, Content, Footer, FooterTab, Button, Item, Input, Icon } from 'native-base'
import { connect } from 'react-redux'
import { getAllProduct, searchProduct, filterProduct } from '../../redux/actions/product'
import {getAllCategory} from '../../redux/actions/category'
import { addCart } from '../../redux/actions/cart'
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
        <Card style={{maxWidth:165, flex: 1, marginBottom: 5, marginRight:5, borderBottomWidth: 2, borderLeftWidth:1, borderBottomColor: "#e91e63", borderLeftColor:"#e91e63"}}>
        <Image source={{uri: item.image}} style={{height: 165, width: 165, flex: 1}} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 14, marginLeft: 10, marginBottom: 5 }}>{item.category}</Text>
            <Text style={{ fontSize: 16, marginLeft: 10, marginBottom: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 10 }}>{this.parseToRupiah(item.price)}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 10 }} >
                    <Text style={{ fontSize: 17, color: "#4285f4" }} onPress={()=> this.onAddCart(item)}>Add Product</Text>
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
            <View style={styles.picker}>
            <Picker
              selectedValue={this.state.category}
              style={{height: 50, width: 100}}
              onValueChange={this.filterProduct}>
              <Picker.Item label="All" value="" />
              {categories.map((category, index) =>
              <Picker.Item
              label={category.name} value={category.id}/>)}
            </Picker>
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
            <FooterTab>
                <Button onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={{  color: "white" }}>Home</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Product')}>
                <Text style={{  color: "white" }}>Manage</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Cart')}>
                <Text style={{ color: "white" }}>Cart</Text>
              </Button>
              <Button onPress={this.onLogout.bind(this)}>
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