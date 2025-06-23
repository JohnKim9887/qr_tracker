import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CustomHeader = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#0056b3', // Brighter blue color
        borderBottomWidth: 2,
        borderBottomColor: '#003366',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 10, // You can adjust this to reduce the top and bottom spacing
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
    },
})

export default CustomHeader
