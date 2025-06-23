import React, { useState } from 'react'

import { randomAddProject,addProjectAPI, getAllProjects } from "../API/ApiProject"

import { randomAddLocation, addLocationAPI, getAllLocations, randomAddTenLocation } from "../API/ApiLocation"
import { getUserTracking , randomAddTracking} from "../API/ApiTracking"

import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native'

const DevTestDB = () => {
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        instructions: '',
        initialClue: '',
        homescreenDisplay: false,
        isPublished: false,
        participantScoring: false,
    })

    const [locationData, setLocationData] = useState({
        project_id: '',
        location_name: '',
        location_trigger: '',
        location_position: '',
        location_content: '',
        extra: '',
        clue: '',
        score_points: 0,
    })
    const [locationProjectId, setLocationProjectId] = useState('') // State for random location project ID

    const [randomLocationProjectId, setRandomLocationProjectId] = useState('') // State for random location project ID
    const [tenRandomLocationProjectId, setTenRandomLocationProjectId] = useState('') // State for random location project ID
    const [message, setMessage] = useState('')

    const toggleBoolean = (field) => {
        setProjectData((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    const handleProjectSubmit = async () => {
        try {
            await addProjectAPI(projectData)
            setMessage('Project inserted successfully!')
            setProjectData({
                title: '',
                description: '',
                instructions: '',
                initialClue: '',
                homescreenDisplay: false,
                isPublished: false,
                participantScoring: false,
            })
        } catch (error) {
            setMessage(`Error inserting project: ${error.message}`)
        }
    }

    const handleLocationSubmit = async () => {
        try {
            await addLocationAPI(locationData)
            setMessage('Location inserted successfully!')
            setLocationData({
                project_id: '',
                location_name: '',
                location_trigger: '',
                location_position: '',
                location_content: '',
                extra: '',
                clue: '',
                score_points: 0,
            })
        } catch (error) {
            setMessage(`Error inserting location: ${error.message}`)
        }
    }
	// Function to handle random project addition
	const handleDisplayLocation = async () => {
		try {
			const result = await getAllLocations(locationProjectId) // Call the random project addition function
			setMessage(JSON.stringify(result, null, 2))
		} catch (error) {
			setMessage(`Error adding location: ${error.message}`)
		}
	}
	
	// Function to handle random project addition
	const handleDisplayProject = async () => {
		try {
			const result = await getAllProjects() // Call the random project addition function
			setMessage(JSON.stringify(result, null, 2))
		} catch (error) {
			setMessage(`Error adding projects: ${error.message}`)
		}
	}
    // Function to handle random project addition
    const handleRandomTrackingAdd = async () => {
        try {
            await randomAddTracking() // Call the random project addition function
            setMessage('Random Tracking added successfully!')
        } catch (error) {
            setMessage(`Error adding random Tracking: ${error.message}`)
        }
    }

    // Function to handle random project addition
    const handleRandomProjectAdd = async () => {
        try {
            await randomAddProject() // Call the random project addition function
            setMessage('Random project added successfully!')
        } catch (error) {
            setMessage(`Error adding random project: ${error.message}`)
        }
    }

    // Function to handle random location addition
    const handleRandomLocationAdd = async () => {
        if (!randomLocationProjectId) {
            Alert.alert(
                'Error',
                'Please enter a project ID to add a random location.'
            )
            return
        }

        try {
            await randomAddLocation(randomLocationProjectId) // Call the random location addition function
            setMessage('Random location added successfully!')
        } catch (error) {
            setMessage(`Error adding random location: ${error.message}`)
        }
    }
    const handleTenRandomLocationAdd = async () => {
        if (!tenRandomLocationProjectId) {
            Alert.alert(
                'Error',
                'Please enter a project ID to add a random location.'
            )
            return
        }

        try {
            await randomAddTenLocation(tenRandomLocationProjectId) // Call the random location addition function
            setMessage('Random location added successfully!')
        } catch (error) {
            setMessage(`Error adding random location: ${error.message}`)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Development Test Database</Text>

            <View style={styles.row}>
                {/* Random Project Button Container */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add Random Project"
                        onPress={handleRandomProjectAdd}
                        color="red"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Add Random Tracker"
                        onPress={handleRandomTrackingAdd}
                        color="green"
                    />
                </View>

                <View style={styles.locationContainer}>
                    <Button
                        title="Add Random Location"
                        onPress={handleRandomLocationAdd}
                        color="blue"
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Project ID for Random Location"
                        value={randomLocationProjectId}
                        onChangeText={setRandomLocationProjectId}
                    />
                </View>
				<View style={styles.locationContainer}>
                    <Button
                        title="Add 10 random Location"
                        onPress={handleTenRandomLocationAdd}
                        color="blue"
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Project ID for Random Location"
                        value={tenRandomLocationProjectId}
                        onChangeText={setTenRandomLocationProjectId}
                    />
                </View>
            </View>

			<View style={styles.row}>				
				<View style={styles.buttonContainer}>
                    <Button
                        title="Show Project"
                        onPress={handleDisplayProject}
                        color="green"
                    />
                </View>

				<View style={styles.buttonContainer}>
                    <Button
                        title="Show Location"
                        onPress={handleDisplayLocation}
                        color="green"
                    />
					<TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Project ID to Print Locations"
                        value={locationProjectId}
                        onChangeText={setLocationProjectId}
                    />
                </View>
            </View>

            <View style={styles.output}>
                <Text style={styles.outputTitle}>Output:</Text>
                <Text>{message}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginRight: 10, // Space between the buttons
        justifyContent: 'top',
    },
    locationContainer: {
        flex: 1,
        justifyContent: 'top',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    panel: {
        flex: 1,
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        elevation: 2,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    output: {
        marginTop: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    outputTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default DevTestDB
