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

const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
		padding: 20,
	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { paddingTop: Platform.OS === 'ios' ? 13 : 7 },
	item: {
        fontSize: 14,
        margin: 5,
        textAlign: 'center',
	},
	price: {
        fontSize: 16,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold',
	},
	image: {
        height: 100,
        width: 100,
        margin: 5,
    },
    totals: {
        marginBottom: 10,
    }
});


export default class FourthActivity extends Component{
    _handlePress = () => {
        const { navigate } = this.props.navigation;
        navigate('AutofillModal');
    }
    importNum = () => {
        if(this.props.navigation.state.params.order != null){
            this.orderNum = this.props.navigation.state.params.order
        }
        else{
            this.orderNum = '0'
        }
    }
    render(){
        this.importNum()
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
                </View>
                <View style={{marginBottom: 15}} />
                <View>
                    <Text style={styles.totals}>Successfully Sent Order!</Text>
                    <Text style={styles.totals}>Order Number: {this.orderNum}</Text>
                    <Button
                    
                        onPress={this._handlePress}
                        title="New Order"
                        color="#000"
                    />
                </View>
            </View>
        );
    }
}