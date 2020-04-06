import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Picker } from 'react-native'
import { Container, Icon, Header, Item, Input, Button, Card,  } from 'native-base'
import { connect } from 'react-redux'

import { getAllProduct, deleteProduct, searchProduct, filterProduct } from '../../redux/actions/product'
// import Spinner from '../spinner/Spinner';
import { ScrollView } from 'react-native-gesture-handler';
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
    Alert.alert(
      'Are you sure want to delete this product ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel'
        },
        {text: 'Yes', onPress:() => this.props.dispatch(deleteProduct(productId))}
      ],
      {cancelable: false}
    )
  }
  searchProduct = (event) => {
    this.setState({ product: event });
    this.props.dispatch(searchProduct(event))
  }
  filterProduct = (event) => {
    console.log('filter', event)
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
      <Card style={{width:165, flex: 1, marginBottom: 5, marginRight:5, borderBottomWidth: 2, borderLeftWidth:1, borderBottomColor: "#e91e63", borderLeftColor:"#e91e63"}}>
        <Image source={{uri: item.image}} style={{height: 165, flex: 1}} />
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
    const {products, categories} = this.props
    return (
      <Container>
      <View searchBar rounded containerStyle={{ backgroundColor: '#e91e63', borderWidth: 1, borderRadius: 5 }}>
          <Item>
            <Input placeholder="Search" onChangeText={this.searchProduct} />
          </Item>
        </View>
        {/* <View style={styles.picker}> */}
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
              value=""
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
    products: state.products.products,
    categories: state.category.categories,
  }
}

export default connect(mapStateToProps)(ProductScreen)
