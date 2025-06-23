import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { UserProvider, useUser } from '../UserContext' // Import useUser from UserContext

export default function _layout() {
	return (
		<Tabs
			screenOptions={{
				headerLeft: () => <DrawerToggleButton tintColor="#36454F" />,
				headerStyle: {
					backgroundColor: '#36454F',
				},
				headerTintColor: '#fff',
				tabBarStyle: {
					backgroundColor: '#D3D3D3', // Light gray background for the tab bar
				},
				tabBarActiveTintColor: '##36454F', // Darker teal for active tab icon and label
				tabBarInactiveTintColor: '#8B8989', // Medium gray for inactive tab icons and labels
			}}
		>
			<Tabs.Screen
				name="ProjectHome"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather name="list" size={24} color={color} />
					),
					tabBarLabel: 'Project Home',
					headerTitle: 'Project Home',
				}}
			/>

			<Tabs.Screen
				name="maps"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather name="map" size={24} color={color} />
					),
					tabBarLabel: 'Maps',
					headerTitle: 'Maps',
				}}
			/>

			<Tabs.Screen
				name="qr_code_scanner"
				options={{
					tabBarIcon: ({ color }) => (
						<Feather name="camera" size={24} color={color} />
					),
					tabBarLabel: 'QR Code Scanner',
					headerTitle: 'QR Code Scanner',
				}}
			/>
		</Tabs>
	)
}
