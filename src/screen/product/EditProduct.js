import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Form, Item, Input, Button, Text, Picker, Icon } from 'native-base';

import { patchProduct } from '../../redux/actions/product';

class EditProductScreen extends Component{

    state = {
        name: "",
        description: "",
        quantity:"",
        image: "",
        category: "",
        price: ""
    };
    componentDidMount(){
        const product = this.props.navigation.getParam("product");

        this.setState({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            image: product.image
        });
    }

    onSubmit = async() => {
        const product = this.props.navigation.getParam("product")
        await this.props.dispatch(patchProduct(product.id, this.state));

        if(!this.props.products.products.isLoading){
            this.props.navigation.navigate('Product');
        }
        
    }
    onChangeCategory(event){
        this.setState({
            category: event
        })
    }

    render(){
        return(
            <Container>
                {/* <Spinner isLoading={this.props.products.isLoading} /> */}
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="Enter Product..." onChangeText={(text) => this.setState({ name: text })} value={`${this.state.name}`}/>
                        </Item>
                        <Item>
                            <Input placeholder="Enter Description..." onChangeText={(text) => this.setState({ description: text })} value={`${this.state.description}`}/>
                        </Item>
                        <Item>
                            <Input placeholder="Enter Price..." onChangeText={(text) => this.setState({ price: text })} value={`${this.state.price}`}/>
                        </Item>
                        <Item>
                            <Input placeholder="Enter Quantity..." onChangeText={(text) => this.setState({ quantity: text })} value={`${this.state.quantity}`}/>
                        </Item>
                        <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select Category ..."
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.category}
                            onValueChange={this.onChangeCategory.bind(this)}
                        >
                            <Picker.Item label="Indonesian Food" value="1" />
                            <Picker.Item label="Beverages" value="2" />
                            <Picker.Item label="Western" value="3" />
                            <Picker.Item label="Chinese Food" value="4" />
                            <Picker.Item label="Middle Eastern" value="5" />
                        </Picker>
                        </Item>
                        {/* <Item>
                            <Input placeholder="Enter Category..." onChangeText={(text) => this.setState({ category: text })} />
                        </Item> */}
                    </Form>
                    <Button block style={{ margin: 10 }} onPress={this.onSubmit}style={{backgroundColor: '#e91e63'}}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(EditProductScreen);