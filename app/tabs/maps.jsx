import React, { useState, useEffect } from 'react'
import { Appearance, View } from 'react-native'
import MapView, { Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import styles from '../tabs_styles'
import { getProjectUserTracking } from '../API/ApiTracking'
import { getOneLocation } from '../API/ApiLocation'
import { useUser } from '../UserContext'

const colorScheme = Appearance.getColorScheme()

export default function Maps() {
	const { userName, projectId } = useUser()
	const [locationPermission, setLocationPermission] = useState(false)
	const [locations, setLocations] = useState([])
	const [userLocation, setUserLocation] = useState({
		latitude: -27.5263381,
		longitude: 153.0954163,
	})
	const [allTrackings, setAllTrackings] = useState([])

	async function requestLocationPermission() {
		console.log('Function requestLocationPermission called')
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status === 'granted') {
			setLocationPermission(true)
		}
	}
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

	
	useEffect(() => {
		const runFetchTrackings = async () => {
			try {
				const allLocationList = [
					...new Set(
						allTrackings.map((tracking) => tracking.location_id)
					),
				]

				console.log('allTrackings', allTrackings)
				console.log('allLocationList', allLocationList)

				let locationDB = []
				for (const location_id of allLocationList) {
					console.log('location_id', location_id)

					const locationData = await getOneLocation(
						projectId,
						location_id
					)
					console.log('locationData', locationData)

					const latlong = locationData[0].location_position
						.replace(/[()]/g, '')
						.split(',')
					console.log('latlong', latlong)

					locationDB.push({
						id: location_id,
						coordinates: {
							latitude: parseFloat(latlong[0]),
							longitude: parseFloat(latlong[1]),
						},
					})
				}
				console.log('LOC DB', locationDB)
				setLocations(locationDB)
			} catch (error) {
				console.error('Error fetching trackings:', error)
			}
		}
		runFetchTrackings()
	}, [allTrackings, projectId])

	useEffect(() => {
		console.log('useEffect for requestLocationPermission called')
		requestLocationPermission()
	}, [])

	useEffect(() => {
		console.log(
			'useEffect for fetching locations with projectId:',
			projectId
		)
		const fetchTrackings = async () => {
			try {
				const trackingsData = await getProjectUserTracking(
					projectId,
					userName
				)
				console.log('trackingsData:', trackingsData)
				console.log('trackingsData:', trackingsData[0])

				setAllTrackings(trackingsData)
			} catch (error) {
				console.error('Error fetching locations:', error.message)
			}
		}
		if (projectId) {
			fetchTrackings()

			console.log(allTrackings)
		}
	}, [projectId])

	useEffect(() => {
		let locationSubscription = null
		if (locationPermission) {
			;(async () => {
				locationSubscription = await Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.High,
						distanceInterval: 10, // in meters
					},
					(location) => {
						setUserLocation({
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						})
						console.log('useEffect nearbyLocation: setMapState ')
						console.log(
							'useEffect nearbyLocation: location',
							locations
						)
					}
				)
			})()
		}

		// Cleanup function
		return () => {
			if (locationSubscription) {
				locationSubscription.remove()
			}
		}
	}, [locationPermission, locations])

	return (
		<>
			<MapView
				camera={{
					center: userLocation,
					pitch: 0,
					heading: 0,
					altitude: 3000,
					zoom: 15,
				}}
				showsUserLocation={locationPermission}
				style={styles.container}
			>
				{locations.map((location) => (
					<Circle
						key={location.id}
						center={location.coordinates}
						radius={100}
						strokeWidth={3}
						strokeColor="#A42DE8"
						fillColor={
							colorScheme === 'dark'
								? 'rgba(128,0,128,0.5)'
								: 'rgba(210,169,210,0.5)'
						}
					/>
				))}
			</MapView>

			<View style={styles.infoContainer}></View>
		</>
	)
}
