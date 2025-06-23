import {
	SafeAreaView,
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { DynamicHeader, SmallDynamicHeader } from './components'

const AboutHeader = () => {
	return (
		<View style={styles.titleContainer}>
			{/* Add Feather icon */}
			<Feather name="book" size={50} color="white" style={styles.icon} />
			<Text style={styles.titleText}>About</Text>
		</View>
	)
}

const SmallAboutHeader = () => {
	return (
		<View style={styles.topSmallHeader}>
			<Text style={styles.topSmallText}>About</Text>
		</View>
	)
}

export default function About() {
	const router = useRouter()

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SmallDynamicHeader title="About" />
			<DynamicHeader title="About" iconName="book" />
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.box}>
						<Text style={styles.boxTitle}>About StoryPath</Text>
						<Text style={styles.descriptionText}>
							StoryPath is a location experience platform designed
							to allow users to create and explore virtual museum
							exhibits, location-based tours, and treasure hunts
							with clues. The platform features a Web app built in
							React that enables users to author these
							experiences, and a React Native App called StoryPath
							Player for deploying them, making it easy to bring
							location-driven narratives to life.
						</Text>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							onPress={() => router.back()}
							title="Go Back"
							color="#0056b3"
						/>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
