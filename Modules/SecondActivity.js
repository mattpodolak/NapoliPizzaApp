import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

var cartArr = [];

export default class SecondActivity extends Component
{  
    static navigationOptions =
    {
        title: 'Cart',
    };
    addtoCart= () => {
        if(this.props.navigation.state.params.category != undefined){
            this.category = this.props.navigation.state.params.category;
            this.name = this.props.navigation.state.params.name;
            this.custom = this.props.navigation.state.params.form;
            cartArr.push(
                {
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
                        {/*<ScrollView>
                            {cartArr.map((cart_items) => {
                                return (
                                    <View key={cart_items.id}>
                                        <Text style={styles.item}>
                                            {cart_items.name}{'\n'}
                                            Price: {cart_items.price}{'\n'}
                                            Size: {cart_items.desc}{'\n'}
                                            Price: {utils.calculatePrice(cart_Arr)}
                                        </Text>
                                    </View>
                                );
                            })}
                            <Text style={styles.divider}></Text>
                            <Text style={styles.totals}>SUBTOTAL: </Text>
                            <Text style={styles.totals}>DELIVERY: </Text>
                            <Text style={styles.totals}>TAX: </Text>
                            <Text style={styles.totals}>TOTAL: </Text>   
                        </ScrollView>*/}
                    </View>
                    <Button
                        onPress={() => this.props.navigation.navigate('PaymentModal')}
                        title="Go To Payment"
                        color="#000"
                    />
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