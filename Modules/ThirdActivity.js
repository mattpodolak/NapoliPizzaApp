import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';

const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZAORDER&body=";


var cartArr = this.state.params.cart;

class AnchorMail extends Component {
    _handlePress = () => {
        this.props.onPress && this.props.onPress();
        var msg = [];
        cartArr.map((cart_info) => {
            msg.push(utils.formatDesc(cart_info));
        })
        console.log("email sent...");
        Linking.openURL(default_body + msg.toString().replace(new RegExp(',', 'g'), ''));
    };
render() {
    return (
        <Button title={this.props.title} onPress={this._handlePress} />
        );
    }
}

export default class ThirdActivity extends Component{  
    static navigationOptions ={
        title: 'Payment',
    };
    render(){
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{height: 100}}></View>
                <Text style={{textAlign: 'center', fontSize: 14}}>PAYMENT</Text>
                <AnchorMail title="SEND ORDER" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    header: { padding: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7 },
    MainContainer: {
    
        flex:1,
        justifyContent: 'center',
        margin: 5
      
     },
    
    ActivityNameTextCss: {
    
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
    },
    header: { 
        padding: 15, 
        paddingTop: Platform.OS === 'ios' ? 13 : 7, 
        alignContent : 'center'
    },    
	item: {
        fontSize: 10,
        backgroundColor: 'lightgrey',
        margin: 5,
        textAlign: 'center',
	},
	price: {
        fontSize: 10,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold',
    }, 
    divider: {
        fontSize: 10,
        backgroundColor: 'dimgrey',
        margin: 7,
        textAlign: 'center',
        height: 4,
    },
    totals: {
        fontSize: 10,
        margin: 3,
        textAlign: 'right',
    },
    });