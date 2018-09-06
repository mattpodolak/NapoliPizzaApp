import React, { Component } from 'react';
import {
	Alert,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    Platform,
    Button,
    ScrollView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import * as utils from './structure/scripts.js';
import {cart as pastOrder} from './CustomerModal'

export default class PastOrderModal extends Component {
    loadCart = () => {
        const { navigate } = this.props.navigation;
        navigate('Cart', {newCart: pastOrder});
        Alert.alert(
            'Loaded last order'
        );
    }
    navHome = () => {
        this.props.navigation.navigate('Home')
    }
    updateCart= () => {
        this.cartUpdated = pastOrder;
    }
    render() {
        this.updateCart();
        return (
            <ScrollView>
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
                <Text style={{ fontSize: 25 }}>Most Recent Customer Order</Text>
                <Button
                    onPress={this.loadCart}
                    title="Add Last Order to Cart"
                />
                <View style={{marginBottom: 15}} />
                <Button
                    onPress={this.navHome}
                    title="New Order"
                />
                <View style={{marginBottom: 15}} />
                <View>
                    <ScrollView>
                        <View style={{paddingBottom: 100}}>
                        {this.cartUpdated.map((cart_items) => {
                                return (
                                    <View key={cart_items.id}>
                                        <View style={styles.cartButtonDiv}>
                                        </View>
                                        <Text style={styles.item}>
                                            {/* Insert Description here instead of the stuff thats in here*/}                                           
                                            {utils.formatDesc(cart_items)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 150,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cartButtonDiv: {
    flex: 1, 
    backgroundColor: 'dimgrey',
    margin: 5,
    marginBottom: 0,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  item: {
    fontSize: 15,
    backgroundColor: 'lightgrey',
    margin: 5,
    marginTop: 0,
    textAlign: 'center',
  },
  header: { paddingTop: Platform.OS === 'ios' ? 13 : 7 },
});