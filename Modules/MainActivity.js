import React from 'react';
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    Platform,
    Button,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import {ScrollView, FlatList} from 'react-native';
 
const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';

//json
const custom_data = require('./structure/custom_json.json');


const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
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
	render() {
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
                        onPress={() => this.props.navigation.navigate('MyModal')}
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
                // row or column
                flexDirection: 'column',
                // top to bottom
                justifyContent: 'space-between',
                // left to right
                margin: 'auto',
                flexWrap: 'wrap',
            }}>


                <ScrollView style={styles.header}>
                    {/* SPECIALTY PIZZA */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SPECIALTY PIZZA</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5, marginBottom: 10}}>
						<FlatList horizontal={true}
                                // data array 13 items
                                data={[
                                    {
                                        key: custom_data.specialty[0].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[0].price,
                                    },
                                    {
                                        key: custom_data.specialty[1].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[1].price,
                                    },
                                    {
                                        key: custom_data.specialty[2].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[2].price,
                                    },
                                    {
                                        key: custom_data.specialty[3].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[3].price,
                                    },
                                    {
                                        key: custom_data.specialty[4].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[4].price,
                                    },
                                    {
                                        key: custom_data.specialty[5].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[5].price,
									},
                                    {
                                        key: custom_data.specialty[6].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[6].price,
									},
                                    {
                                        key: custom_data.specialty[7].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[7].price,
									},
                                    {
                                        key: custom_data.specialty[8].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[8].price,
									},
                                    {
                                        key: custom_data.specialty[9].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[9].price,
									},
                                    {
                                        key: custom_data.specialty[10].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[10].price,
									},
                                    {
                                        key: custom_data.specialty[11].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[11].price,
									},
									{
                                        key: custom_data.specialty[12].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.specialty[12].price,
                                    }									
                                ]}
								// render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'specialty' });
										}}>
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
                                data={[
									{
										key: custom_data.pizza_deals[0].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[0].price,
									},
									{
										key: custom_data.pizza_deals[1].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[1].price,
									},
									{
										key: custom_data.pizza_deals[2].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[2].price,
									},
									{
										key: custom_data.pizza_deals[3].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[3].price,
									},
									{
										key: custom_data.pizza_deals[4].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[4].price,
									},
									{
										key: custom_data.pizza_deals[5].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[5].price,
									},
									{
										key: custom_data.pizza_deals[6].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[6].price,
									},
									{
										key: custom_data.pizza_deals[7].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[7].price,
									},
									{
										key: custom_data.pizza_deals[8].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[8].price,
									},
									{
										key: custom_data.pizza_deals[9].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pizza_deals[9].price,
									}
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
								<View>
									<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
										onPress={(event) => {
										// onPress event fires with an event object
										const { navigate } = this.props.navigation;
										navigate('ToppingModal', { name: item.key, category: 'pizza_deals' });
									}}>
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
                                data={[
                                    {
                                        key: custom_data.wingsandsandwiches[0].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[0].price,
                                    },
                                    {
                                        key: custom_data.wingsandsandwiches[1].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[1].price,
                                    },
                                    {
                                        key: custom_data.wingsandsandwiches[2].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[2].price,
                                    },
                                    {
                                        key: custom_data.wingsandsandwiches[3].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[3].price,
                                    },
                                    {
                                        key: custom_data.wingsandsandwiches[4].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[4].price,
                                    },
                                    {
                                        key: custom_data.wingsandsandwiches[5].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[5].price,
									},
                                    {
                                        key: custom_data.wingsandsandwiches[6].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[6].price,
									},
                                    {
                                        key: custom_data.wingsandsandwiches[7].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.wingsandsandwiches[7].price,
									},
                                ]}
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'wingsandsandwiches' });
										}}>
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
                                data={[
                                    {
                                        key: custom_data.freedelivery[0].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[0].price,
                                    },
                                    {
                                        key: custom_data.freedelivery[1].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[1].price,
                                    },
                                    {
                                        key: custom_data.freedelivery[2].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[2].price,
                                    },
                                    {
                                        key: custom_data.freedelivery[3].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[3].price,
                                    },
                                    {
                                        key: custom_data.freedelivery[4].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[4].price,
                                    },
                                    {
                                        key: custom_data.freedelivery[5].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[5].price,
									},
                                    {
                                        key: custom_data.freedelivery[6].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[6].price,
									},
                                    {
                                        key: custom_data.freedelivery[7].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[7].price,
									},
                                    {
                                        key: custom_data.freedelivery[8].name,
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: custom_data.freedelivery[8].price,
									},
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'freedelivery' });
										}}>
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
								data={[
									{
										key: custom_data.pitas[0].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[0].price,
									},
									{
										key: custom_data.pitas[1].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[1].price,
									},
									{
										key: custom_data.pitas[2].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[2].price,
									},
									{
										key: custom_data.pitas[3].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[3].price,
									},
									{
										key: custom_data.pitas[4].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[4].price,
									},
									{
										key: custom_data.pitas[5].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[5].price,
									},
									{
										key: custom_data.pitas[6].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.pitas[6].price,
									},
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'pitas' });
										}}>
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
								data={[
									{
										key: custom_data.sides[0].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.sides[0].price,
									},
									{
										key: custom_data.sides[1].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.sides[1].price,
									},
									{
										key: custom_data.sides[2].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.sides[2].price,
									},
									{
										key: custom_data.sides[3].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.sides[3].price,
									},
									{
										key: custom_data.sides[4].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.sides[4].price,
									}
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'sides' });
										}}>
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
								data={[
									{
										key: custom_data.salads[0].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.salads[0].price,
									},
									{
										key: custom_data.salads[1].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.salads[1].price,
									},
									{
										key: custom_data.salads[2].name,
										image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
										price: custom_data.salads[2].price,
									},
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
									<View>
										<TouchableOpacity style={{paddingRight: 10, alignItems: 'center'}}
											onPress={(event) => {
											// onPress event fires with an event object
											const { navigate } = this.props.navigation;
											navigate('ToppingModal', { name: item.key, category: 'salads' });
										}}>
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