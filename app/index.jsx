import React from 'react'
import { SafeAreaView, Text, View, Button } from 'react-native'
import { Feather } from '@expo/vector-icons' // Import Feather icons
import { router } from 'expo-router'
import styles from './styles'
import {  SmallDynamicHeader } from './components'

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SmallDynamicHeader title="Welcome" />
            <View style={styles.container}>
                <Feather
                    name="map"
                    size={100}
                    color="#0056b3"
                    style={styles.icon}
                />
                <Text style={styles.welcomeText}>Welcome to Story Path</Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                        Discover exciting travel projects, connect with
                        friends, and explore amazing places with
                        our intuitive platform. Your journey begins here!
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="View Projects"
                        onPress={() => {
                            router.push('/project')
                        }}
                        color="#0056b3"
                    />
                    <View style={styles.buttonSpacer} />
                    <Button
                        title="Go to Profile"
                        onPress={() => {
                            router.push('/profile')
                        }}
                        color="#0056b3"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
