import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native'
import { postOrder } from '../../redux/actions/checkout'
import {removeItem, addQty, reduceQty, removeCart} from '../../redux/actions/cart';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
class CartScreen extends Component {
  state={
    id: AsyncStorage.getItem('user-id')
  }
  convertToRupiah(angka) {
    var rupiah = '';
    var angkarev = angka
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < angkarev.length; i++) {
      if (i % 3 == 0) {
        rupiah += angkarev.substr(i, 3) + '.';
      }
    }
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('') +
      ',-'
    );
  }

  removeItem = cart => {
    const initialTotal = this.props.total;
    const total = initialTotal - cart.qty * cart.price;
    cart.total = total;
    this.props.dispatch(removeItem(cart));
  };

  addQuantity = async cart => {
    const initialTotal = this.props.total;
    if (cart.quantity >= cart.qty) {
      const total = initialTotal + cart.price;
      cart.total = total;
      await this.props.dispatch(addQty(cart));
    } else alert('Stock unsufficient!');
  };

  reduceQuantity = async cart => {
    const initialTotal = this.props.total;
    if (cart.qty > 1) {
      const total = initialTotal - cart.price;
      cart.total = total;
      await this.props.dispatch(reduceQty(cart));
    }
  };

  async onCheckout(cart) {
    const data = {
      product: this.props.cart,
      total: this.props.total,
    };
    
    await this.props.dispatch(postOrder(data));
    await this.props.dispatch(removeCart(cart))
    alert('Transaction success')
  }

  renderRow = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,.1)',
          height: 110,
        }}>
        <Image
          source={{uri: item.image, marginLeft: 10}}
          style={{width: 100, height: 100, marginLeft: 10}}
        />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              marginBottom: 3,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginBottom: 3,
            }}>
            Stock: {item.quantity}
          </Text>

          <View>
            <Text style={{fontSize: 15, marginLeft: '5%'}}>
             @ {this.convertToRupiah(item.price)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '5%',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => this.reduceQuantity(item)}
              style={{
                width: '12%',
                height: '100%',
                alignItems: 'center',
                padding: 3
              }}>
              <Icon name='minus-circle' size={25} color='#E91E63'/>
            </TouchableOpacity>
            <View
              style={{width: '12%', alignItems: 'center', marginHorizontal: 10, padding: 3}}>
              <Text style={{fontSize: 20}}>{item.qty}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.addQuantity(item)}
              style={{
                width: '12%',
                height: '100%',
                alignItems: 'center',
                padding: 3
              }}>
              <Icon name='plus-circle' size={25} color='#E91E63'/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.removeItem(item)}
              style={{
                width: '40%',
                height: '110%',
                alignItems: 'center',
                marginHorizontal: '20%',
                padding: 3
              }}>
              <Icon name='trash-can' size={25} color='#E91E63'/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    console.disableYellowBox = true;
    const {products} = this.props;
    const {cart, total} = this.props;
    return (
     <>
     {cart.length !== 0 ?
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.FlatList}>
            <FlatList
              data={cart}
              renderItem={this.renderRow}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{flexDirection:'row', height:'6%', alignItems:'center', marginBottom: 5, marginLeft: 5}}>
            <Text style={{fontSize: 16}}>Total : {this.convertToRupiah(total)}</Text>
            <TouchableOpacity onPress={()=> this.onCheckout(cart)} style={{marginLeft:'30%', width:'25%', alignItems:'center', backgroundColor:'#4285f4', borderRadius: 25, padding : 3}}><Text style={{fontSize: 18, color: 'white'}}>Checkout</Text></TouchableOpacity>
          </View>
        </View>
        :
      <View style={{alignItems: 'center', justifyContent:'center', flex: 1}}>
<Text>Your Cart is Empty</Text>
      </View>
        }
      </>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    // tabBgColor: '#FFAEAE'
  },
  FlatList: {
    flex: 11,
  },
  sort: {
    flex: 1,
  },
  footer: {
    color: '#FFAEAE',
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginTop: 8,
  },
});
const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
    products: state.products.products,
  };
};
export default connect(mapStateToProps)(CartScreen);
