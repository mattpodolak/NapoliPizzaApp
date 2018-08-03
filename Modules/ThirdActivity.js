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

// default email body
const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZAORDER&body=";
var cartArr = [];

// main screen
export default class ThirdActivity extends Component{
    _handlePress = () => {
        this.props.onPress && this.props.onPress();
        if(Platform.OS === 'ios'){
            var msg = [];
            cartArr.map((cart_info) => {
                msg.push(utils.formatDesc(cart_info));
            })
            console.log("email sent...");
            Linking.openURL(default_body + msg.toString().replace(new RegExp(',', 'g'), ''));  
        }
        else{
            console.log("Android email code not yet implemented");
        }
        this.props.navigation.navigate('CompleteModal')
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
            this.finalTotal = utils.finalPrice(this.subtotal, this.tax, this.delivery);

            //Customer info
            var firstName = customer.firstName.substring(0, 30);
            var lastName = customer.lastName.substring(0, 30);
            var address = customer.addressOne.substring(0, 30);
            var email = 'mpodola2@gmail.com';
            var phone = phoneNum.phone.substring(0, 50);
            var postal = customer.postalCode;
            var city = customer.city;
            var country = 'Canada';
            var province = 'Ontario';
            this.payment = customer.payment;

            //Moneris dev and prod store info
            this.store_id = '89BCM08126'
            this.test_id = 'JMCMNtore3'
            this.hpp = 'hpBQQ66YSF59'
            this.test_hpp = 'hpSN6OEJRM13'

            // dev URL
            //this.DEFAULT_URL = 'https://esqa.moneris.com/HPPDP/index.php/?' + 'ps_store_id=' + this.test_id + '&hpp_key=' + this.test_hpp + '&charge_total=' + this.finalTotal;
            
            //dev URL with more info
            // this.DEFAULT_URL = 'https://esqa.moneris.com/HPPDP/index.php/?' + 'ps_store_id='+this.test_id 
            // + '&hpp_key='+this.test_hpp + '&charge_total='+this.finalTotal + '&hst='+this.tax + '&shipping_cost='+this.delivery
            // + '&email='+email + '&bill_first_name='+firstName + '&bill_last_name='+lastName + '&bill_address_one='+address
            // + '&bill_city='+city + '&bill_state_or_province='+province + '&bill_postal_code='+postal + '&bill_country='+country;

            // prod URL with more info
            this.DEFAULT_URL = 'https://www3.moneris.com/HPPDP/index.php/?' + 'ps_store_id=' + this.store_id + '&hpp_key=' + this.hpp 
            + '&charge_total='+this.finalTotal + '&hst='+this.tax + '&shipping_cost='+this.delivery
            + '&email='+email + '&bill_first_name='+firstName + '&bill_last_name='+lastName + '&bill_address_one='+address
            + '&bill_city='+city + '&bill_state_or_province='+province + '&bill_postal_code='+postal + '&bill_country='+country;

            this.TEXT_INPUT_REF = 'urlInput';
            this.WEBVIEW_REF = 'webview';
            console.log(this.DEFAULT_URL);
        }
    }
    render(){
        this.addtoCart();
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{height: 100}}></View>
                <Text style={{textAlign: 'center', fontSize: 14}}>PAYMENT</Text>
                <WebView
                    style={{marginBottom: 20, marginTop: 20}}
                    ref={this.WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: this.DEFAULT_URL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
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
		flex: 1,
		paddingTop: StatusBar.currentHeight,
        backgroundColor: '#FFF',
        alignItems: 'center'
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