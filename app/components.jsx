import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'

const DynamicHeader = ({ title, iconName }) => {
	return (
		<View style={styles.titleContainer}>
			<Feather
				name={iconName}
				size={50}
				color="white"
				style={styles.icon}
			/>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}

const SmallDynamicHeader = ({ title }) => {
	return (
		<View style={styles.topSmallHeader}>
			<Text style={styles.topSmallText}>{title}</Text>
		</View>
	)
}

export { DynamicHeader, SmallDynamicHeader }
