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
    deleteCart = () => {
        cartArr = [];
    }
    deleteItem = (item) => {
        var len = cartArr.length;
        for(var j = 0; j < len; j++){
            if(cartArr[j].id == item.id && cartArr[j].name == item.name){
                cartArr.splice(j, 1);
                break;
            }
        }
        this.forceUpdate()
    }
    editCart = (item) => {
        // onPress event fires with an event object
		const { navigate } = this.props.navigation;
		navigate('ToppingModal', { name: item.name, category: item.category, form: item.custom });
    }
    addtoCart= () => {
        if(this.props.navigation.state.params !=null){
            if(cartArr.length == 0){
                this.id = this.props.navigation.state.params.id;
                this.category = this.props.navigation.state.params.category;
                this.name = this.props.navigation.state.params.name;
                this.custom = this.props.navigation.state.params.form;
                cartArr.push(
                    {
                        id: this.id,
                        name: this.name,
                        category: this.category,
                        custom: this.custom,
                        price: utils.singlePrice(this.name, this.category, this.custom)
                    },
                );
            }
            //Avoid duplicate items being added if re-render occurs
            else if(this.props.navigation.state.params.id != cartArr[cartArr.length-1].id){
                this.id = this.props.navigation.state.params.id;
                this.category = this.props.navigation.state.params.category;
                this.name = this.props.navigation.state.params.name;
                this.custom = this.props.navigation.state.params.form;
                cartArr.push(
                    {
                        id: this.id,
                        name: this.name,
                        category: this.category,
                        custom: this.custom,
                        price: utils.singlePrice(this.name, this.category, this.custom)
                    },
                );
            }
            this.subtotal = utils.totalPrice(cartArr);
            this.delivery = utils.deliveryCost(cartArr);
            this.tax = utils.taxCost(this.subtotal);
            this.finalTotal = utils.finalPrice(this.subtotal, this.tax, this.delivery);
        }
        else{
            this.subtotal = '0.00';
            this.delivery = '0.00';
            this.tax = '0.00';
            this.finalTotal = '0.00';            
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
                                        </Text>
                                        <TouchableOpacity style={{alignItems: 'center'}}
											onPress={this.editCart(cart_items)}>
                                            <Text style={styles.totals}>EDIT</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.item}>
                                            Price: {cart_items.price}{'\n'}
                                            Size: {cart_items.desc}{'\n'}
                                        </Text>
                                        <TouchableOpacity style={{alignItems: 'center'}}
											onPress={this.deleteItem(cart_items)}>
                                            <Text style={styles.totals}>DELETE</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                            <Text style={styles.divider}></Text>
                            <Text style={styles.totals}>SUBTOTAL: {this.subtotal}</Text>
                            <Text style={styles.totals}>TAX: {this.tax}</Text>
                            <Text style={styles.totals}>DELIVERY: {this.delivery}</Text>
                            <Text style={styles.totals}>TOTAL: {this.finalTotal}</Text>   
                        </ScrollView>
                    </View>
                    {/*<Button
                        onPress={() => this.props.navigation.navigate('PaymentModal')}
                        title="Go To Payment"
                        color="#000"
                    />*/}
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