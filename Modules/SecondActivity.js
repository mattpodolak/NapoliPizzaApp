import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

// name category custom price
// dummy order
dummyArr = [
    {
        id: 1,
        name: "Mega Deal",
        category: "pizza_deals",
        size : 'Medium',
        custom: {
            desc : "2 Medium Pizzas - 3 toppings each",
            default_toppings: ["Coke", "P00p", "Poop", "more poop"],
            extras: {
                Wings: '10',
                Pop: '4',
                Dip: '2',
                Pasta: 'true',
                Chips: 'False',
                "Garlic bread with cheese" : "true"
            },
            addon: {
                name: 'make bick digger',
                price: '2'
    
            },
        },
        price: '32.99'
    },
    {
        id: 2,
        name: "Meat Lovers",
        category: "specialty",
        size : 'Medium',
        custom: {
            desc : "meat lovers pizza",
            default_toppings: ["Pepperoni", "Bacon", "Tomatoes"],
            extras: {
                Wings: '0',
                Pop: '0',
                Dip: '0',
                Pasta: 'true',
                Chips: 'False',
                "Garlic bread with cheese" : "False"
            },
            addon: {
                name: 'make bick digger',
                price: '2'
            },
        },
        price: '12.99'
    },

]



/*
initialArr = [
    {
        id: 1,
        price: 32.99,
        name: "Mega Deal",
        default_toppings: ["Coke", "P00p", "Poop", "more poop"],
        size: 'Medium',
        toppings: '3',
        addon: {
            name: 'make bick digger',
            price: 2

        },
        extras: {
            Wings: 10,
            Pop: 4,
            Dip: 2,
            Pasta: 'true',
            Chips: 'False',
            "Garlic bread with cheese" : "true"
        }
    },
    {
        id: 2,
        price: 299,
        name: "Versace Pizza",
        default_toppings: ["Pepperoni", "Bacon", "Tomatoes"],
        size: 'Gucci',
        toppings: 'a lot',
        addon: null,
        extras: {
            Wings: 10,
            Pop: 4,
            Dip: 2,
            Pasta: 'true',
            Chips: 'true',
            "Garlic bread with cheese" : "true"
        }
    }
  ];
  */

const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZA&body=";

// mail component
class AnchorMail extends Component {
    _handlePress = () => {
        this.props.onPress && this.props.onPress();
        var msg = [];
        dummyArr.map((cart_info) => {
            msg.push(utils.formatDesc(cart_info));
            console.log("mapping...");
        })
        console.log("email sent..");
        Linking.openURL(default_body + "ORDER: \n\n" + msg.toString().replace(new RegExp(',', 'g'), ''));
    };

render() {
    return (
        <Button title={this.props.title} onPress={this._handlePress} />
        );
    }
}

export default class Cart extends Component {
    render() {
      return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                    >
                    <Icon name="md-menu" size={30} />
                    </TouchableOpacity>
                    {/* mapping cart */}
                    <View>
                        <ScrollView>
                            {dummyArr.map((cart_items) => {
                                return (
                                    <View key={cart_items.id}>
                                        <Text style={styles.item}>
                                            {cart_items.name}{'\n'}
                                            Price: {cart_items.price}{'\n'}
                                            Size: {cart_items.desc}{'\n'}
                                            Price: {utils.calculatePrice(cart_items)}
                                        </Text>
                                    </View>
                                );
                            })}
                            {/* show totals */}
                            <Text style={styles.divider}></Text>
                            <Text style={styles.totals}>SUBTOTAL: </Text>
                            <Text style={styles.totals}>DELIVERY: </Text>
                            <Text style={styles.totals}>TAX: </Text>
                            <Text style={styles.totals}>TOTAL: </Text>   
                        </ScrollView>
                        {/* mail order */}
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