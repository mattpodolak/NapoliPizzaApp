import React from 'react';
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
	FlatList
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import {customerInfo as customer} from './CustomerModal'
 
const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';

//json
const custom_data = require('./structure/custom_json.json');


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
});



export default class MainActivity extends React.Component {
	_handleSubmit(itemName, itemCategory){
		console.log('Checking for customer data');
		const { navigate } = this.props.navigation;
		if(customer.firstName != null){
			navigate('ToppingModal', { name: itemName, category: itemCategory });
		}
		else{
			this.props
			navigate('Info');
			Alert.alert(
                'Missing: Customer Info'
            )
		}

	}
	importData = () => {
		this.specialty = [];
		for(var i=0; i<custom_data.specialty.length; i++){
			this.specialty.push(
				{
					key: custom_data.specialty[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.specialty[i].price,
				},
			);
		}

		this.pizza_deals = [];
		for(var i=0; i<custom_data.pizza_deals.length; i++){
			this.pizza_deals.push(
				{
					key: custom_data.pizza_deals[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.pizza_deals[i].price,
				},
			);
		}

		this.wingsandsandwiches = [];
		for(var i=0; i<custom_data.wingsandsandwiches.length; i++){
			this.wingsandsandwiches.push(
				{
					key: custom_data.wingsandsandwiches[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.wingsandsandwiches[i].price,
				},
			);
		}

		this.freedelivery = [];
		for(var i=0; i<custom_data.freedelivery.length; i++){
			this.freedelivery.push(
				{
					key: custom_data.freedelivery[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.freedelivery[i].price,
				},
			);
		}

		this.pitas = [];
		for(var i=0; i<custom_data.pitas.length; i++){
			this.pitas.push(
				{
					key: custom_data.pitas[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.pitas[i].price,
				},
			);
		}

		this.sides = [];
		for(var i=0; i<custom_data.sides.length; i++){
			this.sides.push(
				{
					key: custom_data.sides[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.sides[i].price,
				},
			);
		}

		this.salads = [];
		for(var i=0; i<custom_data.salads.length; i++){
			this.salads.push(
				{
					key: custom_data.salads[i].name,
					image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
					price: custom_data.salads[i].price,
				},
			);
		}
		console.log('All data imported successfully')
	}
	render() {
		this.importData()
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
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Info')}
                        title="Edit Customer Info"
                        color="#000"
                    />
                </View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{/* ADD HERE */}
					<View style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'space-between',
						margin: 'auto',
						flexWrap: 'wrap',
					}}>
                <ScrollView style={styles.header}>
                    {/* SPECIALTY PIZZA */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SPECIALTY PIZZA</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
						<FlatList horizontal={true}
                                data={this.specialty}
								// render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={() => this._handleSubmit(item.key, 'specialty')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>

                    {/* PIZZA DEALS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>PIZZA DEALS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
                        <FlatList horizontal={true}
								// data array 10 items
                                data={this.pizza_deals}
                                
                                // render items
                                renderItem={({item, index}) => 
								<View>
									<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
										onPress={() => this._handleSubmit(item.key, 'pizza_deals')}>
										<Text style={styles.item}>
											{item.key}
										</Text>
										<Image style={styles.image}
											source={{uri: item.image_url}}
										/>
										<Text style={styles.price}>
											{item.price}
										</Text>
									</TouchableOpacity>
								</View>
								}
                            />
                    </View>

                    {/* WINGS AND SANDWICHES ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>WINGS AND SANDWICHES</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
                        <FlatList horizontal={true}
								// data array 8 items
                                data={this.wingsandsandwiches}
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={() => this._handleSubmit(item.key, 'wingsandsandwiches')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>

                    {/* FREE DELIVERY ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>FREE DELIVERY</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
                        <FlatList horizontal={true}
								// data array 9 items
                                data={this.freedelivery}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={() => this._handleSubmit(item.key, 'freedelivery')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>

                    {/* PITAS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>PITAS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
                        <FlatList horizontal={true}
								// data array 7 items
								data={this.pitas}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
										onPress={() => this._handleSubmit(item.key, 'pitas')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>


                    {/* SIDES ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SIDES</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
                        <FlatList horizontal={true}
								// data array
								data={this.sides}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={() => this._handleSubmit(item.key, 'sides')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>


                    {/* SALADS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SALADS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
								// data array
								data={this.salads}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={() => this._handleSubmit(item.key, 'salads')}>
											<Text style={styles.item}>
												{item.key}
											</Text>
											<Image style={styles.image}
												source={{uri: item.image_url}}
											/>
											<Text style={styles.price}>
												{item.price}
											</Text>
										</TouchableOpacity>
									</View>
								}
                            />
                    </View>

                </ScrollView>              
            </View>	
				</View>
			</View>
		);
	}
}