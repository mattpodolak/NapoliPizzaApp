import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';



initialArr = [
    {
        id: 1,
        price: 32.99,
        name: "Mega Deal",
        toppings: 3,
        size: 'Medium',
        addon: {
            name: 'Upgrade to large',
            price: 2

        },
        extras: {
            wings: 10,
            pop: 4,
            dip: 2,
            pasta: 'true'
        }
    },
    {
        id: 2,
        price: 299,
        name: "Versace Pizza",
        toppings: 3,
        size: 'Gucci',
        addon: {
            name: 'Upgrade to large',
            price: 2

        },
        extras: {
            wings: 10,
            pop: 4,
            dip: 2,
            pasta: 'true'
        }
    }
  ];

const body_message = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZA&body=";

// mail component
class AnchorMail extends React.Component {
    _handlePress = () => {
        this.props.onPress && this.props.onPress();
        var msg = [];
        initialArr.map((cart_info) => {
            msg.push(utils.formatDesc(cart_info));
        })
        console.log("email sent...");
        Linking.openURL(body_message + "ORDER: \n\n" + msg.toString().replace(new RegExp(',', 'g'), ''));
    };

render() {
    return (
        <Button title={this.props.title} onPress={this._handlePress} />
        );
    }
}

export default class Cart extends React.Component {
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
                    {/* MAP CART */}
                    <View>
                        <ScrollView>
                            {initialArr.map((buttonInfo) => {
                                return (
                                    <View key={buttonInfo.id}>
                                        <Text style={styles.item}>
                                            {buttonInfo.name}{'\n'}
                                            Price: {buttonInfo.price}{'\n'}
                                            Size: {buttonInfo.size}{'\n'}
                                            Total Price: {utils.calculatePrice(buttonInfo)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        
                        {/* mail */}
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
        backgroundColor: 'dimgrey',
        margin: 5,
        textAlign: 'center',
	},
	price: {
        fontSize: 10,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold',
	}, 
    
    });