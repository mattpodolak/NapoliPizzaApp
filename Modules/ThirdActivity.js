import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView, Linking} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';

const default_body = "mailto://napolipizzabarrie@gmail.com?subject=NAPOLIPIZZA&body=";

// mail component
export default class AnchorMail extends Component {
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
        <View>
            <Button title={this.props.title} onPress={this._handlePress} />
            <AnchorMail title="SEND ORDER" />
        </View>
        );
    }
}