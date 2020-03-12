import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Form, Item, Input, Button, Text, Picker, Icon } from 'native-base';

import { postProduct } from '../../redux/actions/product';

class AddProductScreen extends Component{

    state = {
        name: "",
        description: "",
        quantity:"",
        image: "",
        category: "",
        price: ""
    };

    onSubmit = async() => {
        await this.props.dispatch(postProduct(this.state));

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
                            <Input placeholder="Enter Product..." onChangeText={(text) => this.setState({ name: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="Enter Description..." onChangeText={(text) => this.setState({ description: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="Enter Price..." onChangeText={(text) => this.setState({ price: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="Enter Quantity..." onChangeText={(text) => this.setState({ quantity: text })} />
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
                    <Button block style={{ margin: 10 }} onPress={this.onSubmit} style={{backgroundColor: '#e91e63'}}>
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

export default connect(mapStateToProps)(AddProductScreen);