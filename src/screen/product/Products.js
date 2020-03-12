import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Picker } from 'react-native'
import { Container, Icon, Header, Item, Input, Button, Card,  } from 'native-base'
import { connect } from 'react-redux'

import { getAllProduct, deleteProduct, searchProduct, filterProduct } from '../../redux/actions/product'
// import Spinner from '../spinner/Spinner';

class ProductScreen extends Component {
  state = {
    product:'',
    category:''
  }
  static navigationOptions = ({ navigation }) => {
    return{
        headerTitle: () => null,
        // headerBody: () => (
        //   <Item searchBar rounded>
        //     <Input placeholder="Search" onChangeText={this.searchProduct}/>
        //   </Item>
        // ),
        headerRight: () => (
            <TouchableOpacity 
            style={{ backgroundColor: 'transparent', padding: 'auto', justifyContent: 'center', alignItems: 'center', marginRight: 20}}
            onPress={() => navigation.navigate('AddProduct')}>
                <Icon style={{ color: "#e91e63" }}>+</Icon>
            </TouchableOpacity>
          ),
      }
  }

  async getAllProduct () {
    await this.props.dispatch(getAllProduct())
  }

  componentDidMount () {
   this.getAllProduct()
  }

  onRefreshing = () => {
    this.getAllProduct();
  }

  deleteProduct = (productId) =>{
    this.props.dispatch(deleteProduct(productId))
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
  renderRow = ({item}) => {
    return(
      <Card style={{maxWidth:165, flex: 1, marginBottom: 5, marginRight:5, borderBottomWidth: 2, borderLeftWidth:1, borderBottomColor: "#e91e63", borderLeftColor:"#e91e63"}}>
        <Image source={{uri: item.image}} style={{height: 165, width: 165, flex: 1}} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 14, marginLeft: 10, marginBottom: 5 }}>{item.category}</Text>
            <Text style={{ fontSize: 16, marginLeft: 10, marginBottom: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 10 }}>{this.parseToRupiah(item.price)}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('EditProduct', {
                  product: item
              })}>
                  <Text style={{ fontSize: 17, color: "#4285f4" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: "#4285f4" }} onPress={() => this.deleteProduct(item.id)}>Delete</Text>
              </TouchableOpacity>
          </View>
      </View>
      </Card>
    )
  }

  render () {
    const {products} = this.props
    return (
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
              <Picker.Item label="Indonesian Food" value="1" />
              <Picker.Item label="Beverages" value="2" />
              <Picker.Item label="Western" value="3" />
            </Picker>
        </View>
      <View>
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
      </View>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  picker: {
    marginTop: 7,
    width: '40%',
    backgroundColor: '#e91e63',
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  }
})
const mapStateToProps = (state) => {
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps)(ProductScreen)
