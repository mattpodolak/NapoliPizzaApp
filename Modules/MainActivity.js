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
import {ScrollView, FlatList} from 'react-native'

const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { padding: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7 },
	item: {
        fontSize: 10,
        backgroundColor: 'dimgrey',
        margin: 5,
        textAlign: 'center',
	},
	price: {
        fontSize: 10,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold',
	},
	image: {
        height: 50,
        width: 50,
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
                    {/* PIZZA DEALS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>PIZZA DEALS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                            // data array
                            data={[
                                {
                                    key: 'pizza_1',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '$10',
                                },
                                {
                                    key: 'pizza_2',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '$10',
                                },
                                {
                                    key: 'pizza_3',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '$10',
                                },
                                {
                                    key: 'pizza_4',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '$10',
                                },
                                {
                                    key: 'pizza_5',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '$10',
                                },
                                {
                                    key: 'pizza_6',
                                    image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                    price: '10',
                                },
                            ]}
                            
                            // render items
                            renderItem={({item, index}) => 
                                    <View style={{paddingRight: 10, alignItems: 'center'}}>
                                        <Text style={styles.item}>
                                            {item.key}
                                        </Text>
                                        <Image style={styles.image}
                                            source={{uri: item.image_url}}
                                        />
                                        <Text style={styles.price}>
                                            {item.price}
                                        </Text>
                                    </View>
                            }
                        />
                    </View>

                    {/* SPECIALTY PIZZA ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SPECIALTY PIZZA</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                                // data array
                                data={[
                                    {
                                        key: 'special_pizza_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'special_pizza_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'special_pizza_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'special_pizza_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'special_pizza_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'special_pizza_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
                                        </View>
                                }
                            />
                    </View>

                    {/* WINGS AND SANDWICHES ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>WINGS AND SANDWICHES</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                                // data array
                                data={[
                                    {
                                        key: 'wings_sandwiches_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'wings_sandwiches_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'wings_sandwiches_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'wings_sandwiches_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'wings_sandwiches_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'wings_sandwiches_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
                                        </View>
                                }
                            />
                    </View>

                    {/* SPECIALS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SPECIALS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                                // data array
                                data={[
                                    {
                                        key: 'specials_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'specials_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'specials_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'specials_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'specials_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'specials_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
                                        </View>
                                }
                            />
                    </View>

                    {/* PITAS ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>PITAS</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                                // data array
                                data={[
                                    {
                                        key: 'pita_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'pita_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'pita_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'pita_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'pita_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'pita_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
                                        </View>
                                }
                            />
                    </View>


                    {/* SIDES ROW */}
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>SIDES</Text>
                    <View style={{flex: 1, backgroundColor: 'lightgrey', paddingBottom: 5, paddingTop: 5}}>
                        <FlatList horizontal={true}
                                // data array
                                data={[
                                    {
                                        key: 'side_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'side_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'side_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'side_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'side_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'side_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
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
                                        key: 'salad_1',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'salad_2',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'salad_3',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'salad_4',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'salad_5',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '$10',
                                    },
                                    {
                                        key: 'salad_6',
                                        image_url: 'https://s.hswstatic.com/gif/easy_personal_pizza-100x100.jpg',
                                        price: '10',
                                    },
                                ]}
                                
                                // render items
                                renderItem={({item, index}) => 
                                        <View style={{paddingRight: 10, alignItems: 'center'}}>
                                            <Text style={styles.item}>
                                                {item.key}
                                            </Text>
                                            <Image style={styles.image}
                                                source={{uri: item.image_url}}
                                            />
                                            <Text style={styles.price}>
                                                {item.price}
                                            </Text>
                                        </View>
                                }
                            />
                    </View>

                </ScrollView>

                {/* BUTTON */}    
                <Button
                    onPress={() => {
                        Alert.alert('Hithere!');
                    }}
                    title="Submit"
                />                

            </View>	
				</View>
			</View>
		);
	}
}