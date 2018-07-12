import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

var cartArr = [];
const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZAORDER&body=";

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


export default class SecondActivity extends Component{  
    static navigationOptions =
    {
        title: 'Cart',
    };
    addtoCart= () => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        if(this.props.navigation.state.params.category != undefined){
            this.category = this.props.navigation.state.params.category;
            this.name = this.props.navigation.state.params.name;
            this.custom = this.props.navigation.state.params.form;
            cartArr.push(
                {
                    id: getRandomInt(10000),
                    name: this.name,
                    category: this.category,
                    custom: this.custom,
                    price: utils.singlePrice(this.name, this.category, this.custom)
                },
            );
        }


    }  
    render()
    {
    this.addtoCart()
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                        }}>
                    <Icon name="md-menu" size={30} />
                    </TouchableOpacity>
                    {/* mapping cart */}
                    <View>
                        <ScrollView>
                            {cartArr.map((cart_items) => {
                                return (
                                    <View key={cart_items.id}>
                                        <Text style={styles.item}>
                                            {cart_items.name}{'\n'}
                                            Price: {cart_items.price}{'\n'}
                                            Size: {cart_items.desc}{'\n'}
                                        </Text>
                                    </View>
                                );
                            })}
                            <Text style={styles.divider}></Text>
                            <Text style={styles.totals}>SUBTOTAL: </Text>
                            <Text style={styles.totals}>DELIVERY: </Text>
                            <Text style={styles.totals}>TAX: </Text>
                            <Text style={styles.totals}>TOTAL: </Text>   
                        </ScrollView>
                    </View>
                    <View>
                        <TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
                                                onPress={(event) => {
                                                // onPress event fires with an event object
                                                const { navigate } = this.props.navigation;
                                                navigate('Payment', { cart: cartArr});
                                            }}>
                        </TouchableOpacity>
                        <AnchorMail title="SEND ORDER" />
                    </View>
                </View>
        </View>
      );
        
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
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

     container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
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