import {
	SafeAreaView,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllPublishedProjects } from './API/ApiProject'
import { getProjectTracking } from './API/ApiTracking'
import { useUser } from './UserContext' // Import useUser from UserContext
import { router } from 'expo-router'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import { DynamicHeader, SmallDynamicHeader } from './components'

/**
 * Fetches unique participant usernames for a given project ID.
 *
 * @param {number} projectId - The ID of the project.
 * @returns {Promise<string[]>} An array of unique usernames.
 */
async function getParticipantNumber(projectId) {
	console.assert(
		Number.isInteger(projectId) && projectId !== null,
		'projectId should be a non-null integer'
	)
	const uniqueUsernameList = []

	if (projectId == null) {
		return uniqueUsernameList.length
	}
	const trackingEntries = await getProjectTracking(projectId)
	console.assert(
		trackingEntries !== null,
		'trackingEntries should be a non-null integer'
	)

	for (const entry of trackingEntries) {
		const username = entry.participant_username
		if (username && !uniqueUsernameList.includes(username)) {
			uniqueUsernameList.push(username)
		}
	}
	console.assert(
		Number.isInteger(uniqueUsernameList.length) &&
			uniqueUsernameList.length !== null,
		'uniqueUsernameList.length should be a non-null integer'
	)
	return uniqueUsernameList.length
}

/**
 * Adds a new random tracking entry via the API.
 *
 * @throws {Error} Throws an error if tracking addition fails.
 */
export default function Project() {
	const [projects, setProjects] = useState([])
	const { setProjectId } = useUser() // Get setProjectId function from UserContext
	const [participantCountDict, setParticipantCountDict] = useState({})
	const fetchProjects = async () => {
		try {
			const allProjects = await getAllPublishedProjects()
			setProjects(allProjects)
			console.log('allProjects', allProjects)

			const newCountDict = {}

			for (const project of allProjects) {
				const count = await getParticipantNumber(project.id)
				newCountDict[project.id] = count
			}
			setParticipantCountDict(newCountDict)
			console.log('participantCountDict', participantCountDict)
			console.log('newCountDict', newCountDict)
		} catch (error) {
			console.error('Error fetching projects:', error.message)
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	/**
	 * Navigate to the Project Home page for a specific project.
	 *
	 * @param {number} projectId - The ID of the project.
	 */
	const goProjectHome = (projectId) => {
		console.log('Navigating to ProjectHome with ID:', projectId)
		setProjectId(projectId) // Set projectId in UserContext
		router.push('/tabs/ProjectHome')
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SmallDynamicHeader title="Projects" />
			<DynamicHeader title="Projects" iconName="check-circle" />

			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				
				{projects.map((project) => (
					<View key={project.id}>
						<TouchableOpacity
							style={styles.projectCard}
							onPress={() => goProjectHome(project.id)}
						>
							<View style={styles.projectTextContainer}>
								<Text style={styles.projectTitle}>
									{project.title}{' '}\
									
								</Text>

								<Text style={styles.projectSmallDetail}>
									Participants:{' '}
									{participantCountDict[String(project.id)] ??
										'Loading...'}
								</Text>
							</View>

							<Feather
								name="chevron-right"
								color="blue"
								size={40} // Pass size as a number, not a string
							/>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}
