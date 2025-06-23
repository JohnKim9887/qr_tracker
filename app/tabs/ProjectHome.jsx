import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	View,
	Text,
	ScrollView,
	Appearance,
	Button,
} from 'react-native'
import { useUser } from '../UserContext'
import styles from '../tabs_styles'
import { getAllLocations, getAllLocationScore } from '../API/ApiLocation'
import { getOneProject } from '../API/ApiProject'
import {
	getUserTrackingScore,
	getProjectUserTracking,
	addTrackingAPI,
} from '../API/ApiTracking'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'

export default function ProjectHome() {
	const { userName, projectId, refresh } = useUser()
	const [project, setProject] = useState(null)
	const [allLocations, setAllLocations] = useState([])
	const [trackerLocations, setTrackerLocations] = useState([])
	const [userScore, setUserScore] = useState(0)
	const [totalLocationScore, setTotalLocationScore] = useState(0)

	const [homescreenDisplay, setHomescreenDisplay] = useState(0)
	const [userLocation, setUserLocation] = useState({
		latitude: -27.5263381,
		longitude: 153.0954163,
	})
	const [showLocationContent, setShowLocationContent] = useState(false)
	const [nearestLocationProject, setNearestLocationProject] = useState({
		id: null,
		score_points: null,
		distance: { nearby: false, metres: null },
	})

	const initialMapState = {
		locationPermission: false,
		locations: [],
		userLocation: {
			latitude: -27.5263381,
			longitude: 153.0954163,
		},
		nearbyLocation: {},
	}
	const [mapState, setMapState] = useState(initialMapState)

	const [locationPermission, setLocationPermission] = useState(false)
	const [locationDB, setLocationDB] = useState([])

	async function requestLocationPermission() {
		console.log('Function requestLocationPermission called')
		const { status } = await Location.requestForegroundPermissionsAsync()
		console.log('status')

		if (status === 'granted') {
			setLocationPermission(true)
		}
		setMapState((prevState) => ({
			...prevState,
			locationPermission: true,
		}))
	}

	async function fetchAndProcessLocations() {
		try {
			const updatedLocationsDB = allLocations.map((location) => {
				const latlong = location.location_position
					.replace(/[()]/g, '')
					.split(',')

				location.coordinates = {
					latitude: parseFloat(latlong[0]),
					longitude: parseFloat(latlong[1]),
				}

				return location
			})

			setLocationDB(updatedLocationsDB)
		} catch (error) {
			console.error('Error fetching locations:', error)
		}
	}

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				if (allLocations) {
					await fetchAndProcessLocations()
				} else {
					console.log('ALL LOCATION IS NULL OR UNDEFINED')
				}
			} catch (error) {
				console.error('Error in fetching locations:', error)
			}
		}

		fetchLocations()
	}, [allLocations])

	useEffect(() => {
		requestLocationPermission()
	}, [])

	useEffect(() => {
		if (!projectId) {
			return
		}
		fetchProjects()
		fetchLocations()
		fetchUserScore()
		fetchLocationTotalScore()
		fetchTrackingLocations()
	}, [userName, projectId])

	const NearbyLocation = () => {
		const handleTracking = async () => {
			if (
				nearestLocationProject?.distance?.nearby &&
				nearestLocationProject?.id
			) {
				const input_targeting = {
					project_id: projectId,
					location_id: nearestLocationProject.id,
					points: nearestLocationProject.score_points,
					participant_username: userName,
				}

				try {
					const trackingUser = await getProjectUserTracking(
						projectId,
						userName
					)
					const locationExists = trackingUser.some(
						(entry) =>
							entry.location_id === nearestLocationProject.id
					)
					if (!locationExists) {
						await addTrackingAPI(input_targeting)
						setShowLocationContent(true)
					}
				} catch (error) {
					console.error(
						'Error checking tracking data:',
						error.message
					)
				}
			}
		}

		useEffect(() => {
			if (
				!(
					nearestLocationProject.id == null ||
					nearestLocationProject.score_points == null ||
					nearestLocationProject?.distance?.nearby === false
				)
			) {
				handleTracking()
			}
		}, [nearestLocationProject?.distance?.nearby])

		if (showLocationContent && nearestLocationProject?.distance?.nearby) {
			return (
				<SafeAreaView style={styles.nearbyLocationSafeAreaView}>
					<View style={styles.nearbyLocationView}>
						<Text style={styles.nearbyLocationText}>
							You have entered the location! Points:{' '}
							{nearestLocationProject.score_points}
						</Text>
						<Button
							title="Close"
							onPress={() => setShowLocationContent(false)}
						/>
					</View>
				</SafeAreaView>
			)
		}
		return null
	}
	function calculateDistance(userLocation) {
		console.log('calculateDistance called with:', userLocation)
		const nearbyLocations = locationDB
			.map((location) => {
				console.log(
					`Location coordinates for ${location.location_name}:`,
					location.coordinates
				)
				const metres = getDistance(userLocation, location.coordinates)
				console.log(
					`Distance to ${location.location_name}: ${metres} meters`
				) // Log distance for each location
				location.distance = { metres: metres, nearby: metres <= 100 }
				return location
			})
			.sort(
				(previousLocation, thisLocation) =>
					previousLocation.distance.metres -
					thisLocation.distance.metres
			)

		const closestLocation = nearbyLocations.shift() // Gets the closest location
		return closestLocation // Will return undefined if there are no nearby locations
	}

	useEffect(() => {
		console.log(
			'useEffect triggered with locationPermission:',
			locationPermission
		)

		let locationSubscription = null
		if (locationPermission) {
			;(async () => {
				try {
					locationSubscription = await Location.watchPositionAsync(
						{
							accuracy: Location.Accuracy.High,
							distanceInterval: 10,
						},
						(location) => {
							try {
								const userLocation = {
									latitude: location.coords.latitude,
									longitude: location.coords.longitude,
								}
								console.log('User location:', userLocation)

								const nearbyLocation =
									calculateDistance(userLocation)
								console.log(
									'Nearby location after calculation:',
									nearbyLocation
								)

								if (nearbyLocation != null) {
									console.log(
										'THIS IS NEARBY',
										nearbyLocation
									)
									setNearestLocationProject(nearbyLocation)
								} else {
									console.warn('No nearby location found')
								}

								setUserLocation(userLocation)
							} catch (err) {
								console.error(
									'Error in location update callback:',
									err
								)
							}
						}
					)
				} catch (err) {
					console.error(
						'Error setting up location subscription:',
						err
					)
				}
			})()
		}
		return () => {
			if (locationSubscription) {
				locationSubscription.remove()
			}
		}
		// Inner code will go here...
	}, [locationPermission, locationDB])

	const fetchUserScore = async () => {
		try {
			console.log('Fetching user score...')
			const tempUserScore = await getUserTrackingScore(
				projectId,
				userName
			)
			setUserScore(tempUserScore)
			//console.log('Fetched user score:', tempUserScore)
		} catch (error) {
			console.error('Error fetching user score:', error.message)
		}
	}

	const fetchLocationTotalScore = async () => {
		try {
			console.log('Fetching total location score...')
			const tempScore = await getAllLocationScore(projectId)
			setTotalLocationScore(tempScore)
		} catch (error) {
			console.error('Error fetching total location score:', error.message)
		}
	}

	const fetchProjects = async () => {
		if (!projectId) {
			console.error('Invalid projectId:', projectId)
			return // Prevent fetching if projectId is not valid
		}
		try {
			console.log('Fetching project details...')
			const projectDetail = await getOneProject(projectId)
			setProject(projectDetail[0])
			setHomescreenDisplay(projectDetail[0].homescreen_display)
		} catch (error) {
			console.error('Error fetching project details:', error.message)
		}
	}

	const fetchLocations = async () => {
		if (!projectId) {
			console.error('Invalid projectId:', projectId)
			return // Prevent fetching if projectId is not valid
		}

		try {
			console.log('Fetching all locations...')
			const allLocations = await getAllLocations(projectId)
			setAllLocations(allLocations)
		} catch (error) {
			console.error('Error fetching locations:', error.message)
		}
	}

	const fetchTrackingLocations = async () => {
		try {
			console.log('Fetching tracking locations...')
			const trackerLocations = await getProjectUserTracking(
				projectId,
				userName
			)
			setTrackerLocations(trackerLocations)
			console.log('Fetched tracking locations:', trackerLocations)
		} catch (error) {
			console.error('Error fetching tracking locations:', error.message)
		}
	}

	if (!project) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>
					Loading project details...
				</Text>
			</View>
		)
	}

	function DisplayHomescreen() {
		if (homescreenDisplay === 'Display all locations') {
			return (
				<>
					{allLocations.map((location) => (
						<Text
							key={location.id}
							style={styles.smallLocationInfo}
						>
							Location: {location.location_name}
						</Text>
					))}
				</>
			)
		} else if (homescreenDisplay === 'Display initial clue') {
			return (
				<Text style={styles.projectText}>
					Initial Clue: {project.initial_clue}
				</Text>
			)
		}
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{project.title}</Text>
					</View>

					<View style={styles.detailsContainer}>
						<Text style={styles.projectText}>
							Project ID:{project.id}
						</Text>
						<Text style={styles.projectText}>
							Instructions: {project.instructions}
						</Text>
						<DisplayHomescreen />
						<NearbyLocation />
						<View style={styles.bottomContainer}>
							<View style={styles.infoBox}>
								<Text style={styles.infoTitle}>Points</Text>
								<Text style={styles.infoText}>
									{userScore} / {totalLocationScore}
								</Text>
							</View>
							<View style={styles.infoBox}>
								<Text style={styles.infoTitle}>
									Locations Visited
								</Text>
								<Text style={styles.infoText}>
									{trackerLocations.length} /{' '}
									{allLocations.length}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
