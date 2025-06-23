import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import { UserProvider, useUser } from './UserContext'

const CustomDrawerContent = (props) => {
	const pathname = usePathname()
	const { userName } = useUser()
	useEffect(() => {
		console.log('Current Path', pathname)
	}, [pathname])
	return (
		<DrawerContentScrollView {...props} style={styles.drawerContent}>
			<View style={styles.infoContainer}>
				<View style={styles.infoDetailsContainer}>
					<Text style={styles.appTitle}>StoryPath</Text>
				</View>
			</View>
			<View style={styles.infoContainer}>
				<View style={styles.infoDetailsContainer}>
					<Text style={styles.appTitle}>Current User</Text>
					<Text style={styles.userNameText}>
						{typeof userName === 'string' ? userName : 'Guest'}
					</Text>
				</View>
			</View>
			<DrawerItem
				icon={({ size }) => (
					<Feather
						name="list"
						size={size}
						color={pathname == '/' ? '#fff' : '#003366'}
					/>
				)}
				label={'Welcome'}
				labelStyle={[
					styles.navItemLabel,
					{ color: pathname == '/' ? '#fff' : '#003366' },
				]}
				style={{
					backgroundColor: pathname == '/' ? '#8A9CA8' : '#A0B5C4',
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25, // Shadow opacity
					shadowRadius: 3.5, // Shadow radius
					elevation: 5, // For Android shadow
				}}
				onPress={() => {
					router.push('/')
				}}
			/>
			<DrawerItem
				icon={({ size }) => (
					<Feather
						name="user"
						size={size}
						color={pathname == '/profile' ? '#fff' : '#003366'}
					/>
				)}
				label={'Profile'}
				labelStyle={[
					styles.navItemLabel,
					{ color: pathname == '/profile' ? '#fff' : '#003366' },
				]}
				style={{
					backgroundColor:
						pathname == '/profile' ? '#8A9BA8' : '#A0B5C4',
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25, // Shadow opacity
					shadowRadius: 3.5, // Shadow radius
					elevation: 5, // For Android shadow
				}}
				onPress={() => {
					router.push('/profile')
				}}
			/>
			<DrawerItem
				icon={({ size }) => (
					<Feather
						name="check-circle"
						size={size}
						color={pathname == '/project' ? '#fff' : '#003366'}
					/>
				)}
				label={'Project'}
				labelStyle={[
					styles.navItemLabel,
					{ color: pathname == '/project' ? '#fff' : '#003366' },
				]}
				style={{
					backgroundColor:
						pathname == '/project' ? '#8A9BA8' : '#A0B5C4',
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25, // Shadow opacity
					shadowRadius: 3.5, // Shadow radius
					elevation: 5, // For Android shadow
				}}
				onPress={() => {
					router.push('/project')
				}}
			/>
			<DrawerItem
				icon={({ size }) => (
					<Feather
						name="book"
						size={size}
						color={pathname == '/about' ? '#fff' : '#003366'}
					/>
				)}
				label={'About'}
				labelStyle={[
					styles.navItemLabel,
					{ color: pathname == '/about' ? '#fff' : '#003366' },
				]}
				style={{
					backgroundColor:
						pathname == '/about' ? '#8A9BA8' : '#A0B5C4',
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25, // Shadow opacity
					shadowRadius: 3.5, // Shadow radius
					elevation: 5, // For Android shadow
				}}
				onPress={() => {
					router.push('/about')
				}}
			/>
			<DrawerItem
				icon={({ size }) => (
					<Feather
						name="book"
						size={size}
						color={
							pathname === '/dev_test_folder/DevTestDB'
								? '#fff'
								: '#003366'
						} // White for active, dark blue for inactive
					/>
				)}
				label={'DevTestDB'}
				labelStyle={[
					styles.navItemLabel,
					{
						color:
							pathname == '/dev_test_folder/DevTestDB'
								? '#fff'
								: '#003366',
					}, // White when active or pressed, dark blue when inactive
				]}
				style={{
					backgroundColor:
						pathname == '/dev_test_folder/DevTestDB'
							? '#8A9BA8'
							: '#A0B5C4',

					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25, // Shadow opacity
					shadowRadius: 3.5, // Shadow radius
					elevation: 5, // For Android shadow
				}}
				onPress={() => {
					router.push('/dev_test_folder/DevTestDB')
				}}
			/>
		</DrawerContentScrollView>
	)
}

export default function Layout() {
	return (
		<UserProvider>
			<View style={styles.container}>
				{/* Middle Section: Content */}
				<View style={styles.middle}>
					<Drawer
						drawerContent={(props) => (
							<CustomDrawerContent {...props} />
						)}
						screenOptions={{
							headerShown: true,
							headerStyle: {
								backgroundColor: '#333333', // Brighter blue color
							},
							headerTintColor: '#fff', // Text color for the header
							headerTitleStyle: {
								fontWeight: 'bold', // Make the title bold
								fontSize: 24, // Increase font size for better visibility
							},
							headerTitle: 'StoryPath',
							headerBackTitleVisible: false, // Hide back button title
						}}
					>
						<Drawer.Screen
							name="index"
							options={{ headerShown: true }}
						/>
						<Drawer.Screen
							name="project"
							options={{ headerShown: true }}
						/>
						<Drawer.Screen
							name="profile"
							options={{ headerShown: true }}
						/>
						<Drawer.Screen
							name="about"
							options={{ headerShown: true }}
						/>
					</Drawer>
				</View>
			</View>
		</UserProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#BAC9D6',
	},
	welcomeContainer: {
		alignItems: 'center', // Center the text horizontally
		padding: 20, // Add some padding for spacing
	},
	welcomeText: {
		fontSize: 18, // You can adjust the size as needed
		fontWeight: 'bold',
	},
	middle: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	pageContent: {
		// Style for the content of each page
		fontSize: 16,
		color: '#333',
		textAlign: 'center',
		marginTop: 20, // Margin at the top
	},
	bottom: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	footerText: {
		fontSize: 16,
		color: '#333',
	},
	navItemLabel: {
		marginLeft: -20,
		fontSize: 18,
	},
	header: {
		height: 80,
		backgroundColor: '#003366',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 10,
	},
	infoDetailsContainer: {
		marginTop: 25,
		marginLeft: 10,
	},
	appTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	drawerContent: {
		backgroundColor: '#D9D9D9',
	},
	userNameText: {
		fontSize: 16,
		color: '#333', // Dark gray text for the username
	},
	labelStyle: {
		borderRadius: 5, // Slightly rounded corners
		padding: 10, // Padding for better touch area
		shadowColor: '#000', // Shadow color
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25, // Shadow opacity
		shadowRadius: 3.5, // Shadow radius
		elevation: 5, // For Android shadow
	},
})
