import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';

import DrawerHeader from './src/DrawerHeader';

const styles = StyleSheet.create({
	customDrawerTouch: {
		paddingLeft: 13,
		paddingTop: 15,
	},
	customDrawerIcon: { paddingRight: 10 },
	backButtonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 17,
		paddingLeft: 3,
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 1,
	},
});

class MainDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainDrawer: true,
			currentComponent: '',
		};
	}

	toggleMainDrawer = () =>
		this.setState(prevState => ({ mainDrawer: !prevState.mainDrawer }));

	renderMainDrawerComponents = mainDrawerItems =>
		Object.keys(mainDrawerItems).map(item => (
			<OuterDrawerItem
				key={item}
				label={item}
				onPress={() => {
					this.setState({
						currentComponent: item,
						mainDrawer: false,
					});
				}}
			/>
		));

	navigateToCallback = routeName => {
		this.setState({ mainDrawer: true });
		const { navigate } = this.props.navigation;
		navigate(routeName, { name: 'nothing'});
	};

	render() {
		const { items, ...restProps } = this.props;

		return (
			<ScrollView>
				<DrawerHeader navigateToCallback={this.navigateToCallback} />
				<TouchableOpacity
					onPress={this.toggleMainDrawer}
					style={styles.customDrawerTouch}
				>
				</TouchableOpacity>
				<DrawerItems items={items} {...restProps} />
			</ScrollView>
		);
	}
}

export default MainDrawer;