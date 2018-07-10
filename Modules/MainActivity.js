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

const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { padding: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7 },
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
					<Image
						source={{
							uri: LOGO_URL,
							width: 70,
							height: 70,
						}}
					/>
					<View style={{ flexDirection: 'column', paddingLeft: 10 }}>
						<Text style={{ fontSize: 17 }}>Napoli Pizza Ordering</Text>
					</View>
				</View>
			</View>
		);
	}
}