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
    Platform, 
    WebView
} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

// default email body
const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZAORDER&body=";
var cartArr = [];
// mail component
class AnchorMail extends Component {
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
        
    };
render() {
    return (
        <Button title={this.props.title} onPress={this._handlePress} />
        );
    }
}
// main screen
export default class ThirdActivity extends Component{  
    static navigationOptions ={
        title: 'PaymentModal',
    };
    addtoCart= () => {
        if (this.props.navigation.state.params.cart != undefined){
            cartArr = this.props.navigation.state.params.cart;

            this.subtotal = utils.totalPrice(cartArr);
            this.delivery = utils.deliveryCost(cartArr);
            this.tax = utils.taxCost(this.subtotal);
            this.finalTotal = utils.finalPrice(this.subtotal, this.tax, this.delivery);
            this.store_id = '89BCM08126'
            this.hpp = 'hpBQQ66YSF59'
            this.DEFAULT_URL = 'https://esqa.moneris.com/HPPDP/index.php?' + 'ps_store_id=' + this.store_id + '&hpp_key=' + this.hpp + '&charge_total=' + this.finalTotal;
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
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: this.DEFAULT_URL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
                <Text style={styles.divider}></Text>
                <Text style={styles.totals}>SUBTOTAL: {this.subtotal}</Text>
                <Text style={styles.totals}>TAX: {this.tax}</Text>
                <Text style={styles.totals}>DELIVERY: {this.delivery}</Text>
                <Text style={styles.totals}>TOTAL: {this.finalTotal}</Text>  
                <AnchorMail title="SEND ORDER"/>
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