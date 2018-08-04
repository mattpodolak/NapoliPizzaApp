import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';
import {customerInfo as customer} from './CustomerModal'
import t from 'tcomb-form-native';

const Form = t.form.Form;
const Tip = t.struct({
    tipAmount: t.enums.of(['0%', '5%', '10%', '15%', '18%', '20%'], 'Tip Percent'),
});

const options = {
    fields: {
        tipAmount: {
            label: 'Tip Percent',
        },
    }
}

var defaultTip = {
    tipAmount: '0%'
}

var cartArr = [];

function deleteCart(){
    cartArr = [];
}

function loadCart(){
    return cartArr;
}
export default class SecondActivity extends Component
{  
    static navigationOptions =
    {
        title: 'Cart',
    };
    payConfirm = () => {
        //empty cart
        var tempCart = cartArr;

        //delete cart here if u want

        // send cart info to payment screen
        const { navigate } = this.props.navigation;
        navigate('PaymentModal', { cart: tempCart, tip:this.tip});
    }
    goPay = () => {
        if(cartArr.length > 0){
            if(customer.firstName != null){
                Alert.alert(
                    'WARNING',
                    'Are you sure you would like to proceed to payment?',
                    [
                        {text: 'Continue', onPress: ()=> this.payConfirm()},
                        {text: 'Cancel', onPress: ()=> console.log('Canceled payment')}
                    ],
                    {cancelable: false}
                ); 
            }
            else{
                this.props
                navigate('Info');
                //alert that customer info is empty
                Alert.alert(
                    'Missing customer info'
                ) 
            }           
        }
        else{
            //alert that cart is empty
            Alert.alert(
                'Cart is empty'
            ) 
        }
          
    }
    clearCart= () => {
        cartArr = [];
        console.log('Cleared cart')
        this.props.navigation.state.params = null;
        this.updateTip();
        this.forceUpdate();
    }
    loadCart= () => {
        this.cartUpdated = cartArr;
        console.log('UPDATE')
    }
    _deleteItem(item){
        this.props.onPress && this.props.onPress();
        var len = cartArr.length;
        for(var j = 0; j < len; j++){
            if(cartArr[j].id == item.id && cartArr[j].name == item.name){
                cartArr.splice(j, 1);
                console.log('Post', cartArr)
                break;
            }
        }
        console.log('DELETE ', item)
        this.props.navigation.state.params = null;
        this.updateTip();
        this.forceUpdate();
    }
    _editCart(item){
        this.props.onPress && this.props.onPress();
        //onPress event fires with an event object
        const { navigate } = this.props.navigation;
        navigate('ToppingModal', { name: item.name, category: item.category, form: item.custom });
        console.log('EDIT ', item)
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
        }
        if(cartArr.length > 0){
            this.subtotal = utils.totalPrice(cartArr);
            this.delivery = utils.deliveryCost(cartArr);
            this.tax = utils.taxCost(this.subtotal);
            this.finalTotal = utils.finalPrice(this.subtotal, this.tax, this.delivery);
            if(defaultTip.tipAmount == '0%'){
                this.tip = '0.00';
                this.grandTotal = this.finalTotal;
            }
        }
    }  
    updateTip= () => {
        if(cartArr.length > 0){
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

        const value = this._form.getValue();
        defaultTip = value
        //'0%', '5%', '10%', '15%', '18%', '20%'
        if(value == null){
            this.tip = 0;
        }
        else if(value.tipAmount == null){
            this.tip = 0;
        }
        else if(value.tipAmount == '0%'){
            this.tip = 0; 
        }
        else if(value.tipAmount == '5%'){
            this.tip = this.finalTotal*0.05; 
        }
        else if(value.tipAmount == '10%'){
            this.tip = this.finalTotal*0.1; 
        }
        else if(value.tipAmount == '15%'){
        this.tip = this.finalTotal*0.15; 
        }
        else if(value.tipAmount == '18%'){
            this.tip = this.finalTotal*0.20; 
        }
        else if(value.tipAmount == '20%'){
            this.tip = this.finalTotal*0.20; 
        }
            
        this.tip = this.tip.toFixed(2);
        var tempVal = Number(this.finalTotal)
        this.grandTotal = Number(this.tip)+Number(tempVal);
        this.grandTotal = this.grandTotal.toFixed(2);
        this.props.navigation.state.params = null;
        this.forceUpdate()
    }
    render()
    {
    this.addtoCart()
    this.loadCart()
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
                    <View style={{marginBottom: 15}} />
                    {/* mapping cart */}
                    <View>
                        <ScrollView>
                            <View style={{paddingBottom: 100}}>
                            {this.cartUpdated.map((cart_items) => {
                                return (
                                    <View key={cart_items.id}>
                                        <View style={styles.cartButtonDiv}>
                                                <TouchableOpacity style={{alignItems: 'center', width:80}}
                                                    onPress={() => this._deleteItem(cart_items)}>
                                                    <Text style={styles.cartButton}>DELETE</Text>
                                                </TouchableOpacity>
                                                <Text style={{color:'white'}}>{cart_items.name}</Text>
                                                <TouchableOpacity style={{alignItems: 'center', width:80}}
                                                    onPress={() => this._editCart(cart_items)}>
                                                    <Text style={styles.cartButton}>EDIT</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <Text style={styles.item}>
                                            {/* Insert Description here instead of the stuff thats in here*/}                                           
                                            {utils.formatDesc(cart_items)}
                                        </Text>
                                    </View>
                                );
                            })}
                            <Button 
                                title="Clear Cart"
                                onPress={this.clearCart}
                            />
                            {/**<View style={{marginBottom: 15}} />
                            <Text style={styles.divider}></Text>**/}
                            <Form 
                                ref={c => this._form = c} // assign a ref
                                type={Tip} 
                                options={options} // pass the options via props
                                value={defaultTip}
                            />
                            <Button 
                                title="Update Tip"
                                onPress={this.updateTip}
                            />
                            <Text style={styles.totals}>SUBTOTAL: {this.subtotal}</Text>
                            <Text style={styles.totals}>TAX: {this.tax}</Text>
                            <Text style={styles.totals}>DELIVERY: {this.delivery}</Text>
                            <Text style={styles.totals}>TOTAL: {this.finalTotal}</Text> 
                            <Text style={styles.totals}>TIP: {this.tip}</Text>
                            <Text style={styles.totals}>GRAND TOTAL: {this.grandTotal}</Text>  
                            <Button style={{paddingRight: 10, alignItems: 'center', marginBottom: 10}}
                                title="PAYMENT"
                                onPress={this.goPay}
                            />
                            </View>
                        </ScrollView>
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
        fontSize: 15,
        backgroundColor: 'lightgrey',
        margin: 5,
        marginTop: 0,
        textAlign: 'center',
	},
	price: {
        fontSize: 15,
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
        fontSize: 20,
        margin: 3,
        textAlign: 'right',
    },
    cartButton: {
        fontSize: 15,
        marginBottom: 5,
        color: 'white'
    },
    cartButtonDiv: {
        flex: 1, 
        backgroundColor: 'dimgrey',
        margin: 5,
        marginBottom: 0,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'row'
    }
    });