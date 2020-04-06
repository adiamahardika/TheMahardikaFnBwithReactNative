import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import {Item, Input, Form, Label, Button, Thumbnail, Text} from 'native-base'
import {REACT_APP_API} from 'react-native-dotenv'
import BgImage from '../../images/background.jpg'
import Logo from '../../images/logo.png'
import axios from 'axios'
class LoginScreen extends Component {
    state={
        email:'',
        password:''
    }

    onChangeEmail = (event) =>{
        this.setState({
            email: event
        })
    }
    onChangePassword = (event) =>{
        this.setState({
            password: event
        })
    }
     onSubmit = () => {
         axios
            .post(`${REACT_APP_API}/user/login`, this.state)
            .then(response => {
                AsyncStorage.setItem('token', response.data.result.token);
                AsyncStorage.setItem('user-id', response.data.result.id);
                AsyncStorage.setItem('isAuth', true);
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            })
     }
    render(){
        console.disableYellowBox= true
        return(
            <View style={styles.containerStyle}>
                <Image style={styles.bgImageStyle} source={BgImage}/>
                <View style={styles.logoStyle}>
                    <Thumbnail square large source={Logo}/>
                    <Text style={styles.textLogoStyle}>The Mahardika FnB</Text>
                </View>
                <Form style={styles.formLoginStyle}>
                     <Item floatingLabel>
                         <Label>
                             <Text style={styles.inputStyle}>Email</Text>
                         </Label>
                         <Input style={styles.inputStyle} onChangeText={this.onChangeEmail}/>
                     </Item>
                     <Item floatingLabel>
                         <Label>
                             <Text style={styles.inputStyle}>Password</Text>
                         </Label>
                         <Input style={styles.inputStyle} secureTextEntry={true} onChangeText={this.onChangePassword}/>
                     </Item>
                 </Form>
                 <Button block light style={styles.footerBottomStyle} onPress={this.onSubmit}>
                     <Text style={styles.loginButton}>Login</Text>
                 </Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerStyle:{
        flex:1
    },
    bgImageStyle:{
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    logoStyle:{
        marginTop:90,
        marginBottom: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogoStyle:{
        fontSize: 15,
        color: 'white'
    },
    textTitleStyle: {
        fontSize: 15,
        color: 'white'
    },
    formLoginStyle:{
        marginTop: -100,
        paddingLeft: 10,
        paddingRight: 30
    },
    inputStyle:{
        color: 'white',
        marginBottom: 6,
        fontSize:14
    },
    footerBottomStyle:{
        marginTop: 26,
        paddingTop: 10,
        marginLeft: 16,
        marginRight:16
    },
    loginButton:{
        color:'#e91e63'
    }
})
export default LoginScreen