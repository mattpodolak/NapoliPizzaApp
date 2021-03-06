import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    StatusBar, 
    TouchableOpacity, 
    Platform, 
    Alert, 
    ScrollView, 
    Linking, 
    WebView
} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import {customerInfo as customer} from './CustomerModal'
import {phoneNum} from './CustomerModal'
import * as utils from './structure/scripts.js';
import {auth, userId} from './Login';

// default email body
const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZAORDER&body=";
var cartArr = [];

// require the module
const Frisbee = require('frisbee');

// create a new instance of Frisbee
const api = new Frisbee({
  baseURI: 'https://pizza-admin.herokuapp.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// main screen
export default class ThirdActivity extends Component{
    _handlePress = () => {
        this.props.onPress && this.props.onPress();
        // temporarily removing email code
        // if(Platform.OS === 'ios'){
        //     var msg = [];
        //     cartArr.map((cart_info) => {
        //         msg.push(utils.formatDesc(cart_info));
        //     })
        //     console.log("email sent...");
        //     Linking.openURL(default_body + msg.toString().replace(new RegExp(',', 'g'), ''));  
        // }
        // else{
        //     console.log("Android email code not yet implemented");
        // }
        // function invoked immediately with async/await
        (async () => {
            // log in to our API with a user/pass
            try {
                //Add order to database
                res = await api.post('/order', {
                    headers: {
                        'X-Auth-Token': auth, 
                        'X-User-Id': userId
                    },
                    body:{ 
                        phone: this.phoneNumProp, 
                        cart: cartArr, 
                        orderNum: this.orderNum, 
                        deliveryType: this.deliveryType, 
                        subtotal: this.subtotal, 
                        tax: this.tax, 
                        delivery: this.delivery, 
                        tip: this.tip,
                        user: 'Napoli', 
                    }
                });
                console.log('response', res.body);

                // handle HTTP or API errors
                if (res.body.status == "error"){
                    //throw res.body.message;
                    Alert.alert(
                        res.body.message
                    );
                }       
            } catch (err) {
            throw err;
            }
        })(); 
        this.props.navigation.navigate('CompleteModal',{ order: this.orderNum })
        Alert.alert(
            'Order Sent!'
        )
        
    };  
    addtoCart= () => {
        if (this.props.navigation.state.params.cart != undefined){
            cartArr = this.props.navigation.state.params.cart;

            this.subtotal = utils.totalPrice(cartArr);
            this.delivery = utils.deliveryCost(cartArr);
            this.tax = utils.taxCost(this.subtotal);
            this.tip = this.props.navigation.state.params.tip;
            this.finalTotal = utils.finalPrice(this.subtotal, this.tax, this.delivery);
            this.grandTotal = Number(this.tip)+Number(this.finalTotal)
            this.grandTotal = Number(this.grandTotal.toFixed(2));

            //Customer info
            var firstName = customer.firstName.substring(0, 30);
            var lastName = customer.lastName.substring(0, 30);
            var address = customer.addressOne.substring(0, 30);
            var email = 'f7059888997@yahoo.com';
            var phone = phoneNum.phone.substring(0, 50);
            var postal = customer.postalCode;
            var city = customer.city;
            var country = 'Canada';
            var province = 'Ontario';
            this.payment = customer.payment;
            this.deliveryType = customer.delivery;
            this.phoneNumProp = phone

            //Moneris dev and prod store info
            this.store_id = '89BCM08126'
            this.test_id = 'JMCMNtore3'
            this.hpp = 'hpBQQ66YSF59'
            this.test_hpp = 'hpSN6OEJRM13'
            var d = new Date();
            var n = d.getTime();
            this.orderNum = utils.MD5(n.toString())

            // dev URL
            //this.DEFAULT_URL = 'https://esqa.moneris.com/HPPDP/index.php/?' + 'ps_store_id=' + this.test_id + '&hpp_key=' + this.test_hpp + '&charge_total=' + this.finalTotal;
            
            //dev URL with more info
            // this.DEFAULT_URL = 'https://esqa.moneris.com/HPPDP/index.php/?' + 'ps_store_id='+this.test_id 
            // + '&hpp_key='+this.test_hpp + '&charge_total='+this.finalTotal + '&hst='+this.tax + '&shipping_cost='+this.delivery
            // + '&email='+email + '&bill_first_name='+firstName + '&bill_last_name='+lastName + '&bill_address_one='+address
            // + '&bill_city='+city + '&bill_state_or_province='+province + '&bill_postal_code='+postal + '&bill_country='+country;

            // prod URL with more info
            // this.DEFAULT_URL = 'https://www3.moneris.com/HPPDP/index.php/?' + 'ps_store_id=' + this.store_id + '&hpp_key=' + this.hpp 
            // + '&charge_total='+this.grandTotal + '&hst='+this.tax + '&shipping_cost='+this.delivery
            // + '&email='+email + '&bill_first_name='+firstName + '&bill_last_name='+lastName + '&bill_address_one='+address
            // + '&bill_city='+city + '&bill_state_or_province='+province + '&bill_postal_code='+postal + '&bill_country='+country;

            // prod URL with less info
            this.DEFAULT_URL = 'https://www3.moneris.com/HPPDP/index.php?' + 'ps_store_id=' + this.store_id + '&hpp_key=' + this.hpp 
            + '&charge_total='+this.grandTotal + '&hst='+this.tax + '&shipping_cost='+this.delivery
            + '&email='+email + '&order_id='+this.orderNum;

            this.TEXT_INPUT_REF = 'urlInput';
            this.WEBVIEW_REF = 'webview';
            console.log(this.DEFAULT_URL);
        }
    }
    render(){
        this.addtoCart();
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
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
                    </View>
                </View>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Info')}
                        title="Edit Customer Info"
                        color="#000"
                    />
                </View>
                <View style={{marginBottom: 15}} />
                <Text style={{textAlign: 'center', fontSize: 14}}>ORDER: {this.orderNum}</Text>
                <Button title="Process Payment" onPress={ ()=>{ Linking.openURL(this.DEFAULT_URL)}} />
                <Text style={styles.divider}></Text>
                <Text style={styles.totals}>SUBTOTAL: {this.subtotal}</Text>
                <Text style={styles.totals}>TAX: {this.tax}</Text>
                <Text style={styles.totals}>DELIVERY: {this.delivery}</Text>
                <Text style={styles.totals}>TOTAL: {this.finalTotal}</Text> 
                <Button title="SEND ORDER" onPress={this._handlePress} /> 
            </View>
        );
    }
}
// stylesheet
const styles = StyleSheet.create({
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
    container: {
		paddingTop: StatusBar.currentHeight,
        backgroundColor: '#FFF',
    },
    header: { padding: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7 },
    MainContainer: {
        flex : 1,
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