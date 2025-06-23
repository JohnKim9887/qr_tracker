import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { addTrackingAPI, getProjectUserTracking } from '../API/ApiTracking'
import { getOneLocation } from '../API/ApiLocation'
import { useUser } from '../UserContext'

export default function QR_Code_Scanner() {
	const [scanned, setScanned] = useState(false)
	const [scannedLocationID, setScannedLocationID] = useState('')
	const [scannedProjectID, setScannedProjectID] = useState('')
	const [locationContent, setLocationContent] = useState('')
	const [scannedData, setScannedData] = useState('')
	const [modalVisible, setModalVisible] = useState(false)
	const [permission, requestPermission] = useCameraPermissions()
	const { userName, projectId, refreshData } = useUser()

	const permissionLoading = !permission
	const permissionGranted = permission?.granted

	const handleTracking = async () => {
		if (projectId !== scannedProjectID) {
			return
		}
		const locationReturned = await getOneLocation(
			projectId,
			scannedLocationID
		)
		console.log('RETURNED location', locationReturned)
		console.log('RETURNED location Reduced', locationReturned[0])
		setLocationContent(locationReturned[0].location_content)
		if (locationReturned[0]) {
			const input_targeting = {
				project_id: projectId,
				location_id: scannedLocationID,
				points: locationReturned[0].score_points,
				participant_username: userName,
			}
			try {
				const trackingUser = await getProjectUserTracking(
					projectId,
					userName
				)
				console.log(trackingUser)

				const locationExistsInTracking = trackingUser.some(
					(entry) => entry.location_id === scannedLocationID
				)

				if (locationExistsInTracking) {
					console.log('Location already tracked.')
				} else {
					console.log(
						'Location not tracked yet, adding tracking entry.'
					)
					addTrackingAPI(input_targeting)
					refreshData()
				}
			} catch (error) {
				console.error('Error checking tracking data:', error.message)
			}
		}
	}

	useEffect(() => {
		if (scannedLocationID) {
			handleTracking()
		}
	}, [scannedLocationID])

	useEffect(() => {
		setScannedData('')
		setScannedLocationID('')
		setScannedProjectID('')
		setScanned(false)
	}, [userName, projectId])

	if (permissionLoading) {
		return (
			<View style={styles.container}>
				<Text>Requesting permissions...</Text>
			</View>
		)
	}

	if (!permissionGranted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="Grant permission" />
			</View>
		)
	}

	const handleBarCodeScanned = ({ data }) => {
		setScanned(true)
		setScannedData(data)
		const [ScannedProjectId, ScannedLocationId] = data
			.split(',')
			.map(Number)
		setScannedProjectID(ScannedProjectId)
		setScannedLocationID(ScannedLocationId)
		setModalVisible(true) // Show the modal with scanned data
	}

	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				type="front"
				onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
			/>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>
						locationContent: {locationContent}
					</Text>
					<Text style={styles.modalText}>
						Scanned data: {scannedData}
					</Text>
					<Button
						title="Close"
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</Modal>
			{scanned && (
				<View style={styles.scanResultContainer}>
					<Text style={styles.scanResultText}>
						Scanned data: {scannedData}
					</Text>
					<Button
						title="Tap to Scan Again"
						onPress={() => setScanned(false)}
					/>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	scanResultContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		padding: 15,
	},
	scanResultText: {
		fontSize: 16,
		marginBottom: 10,
	},
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
		padding: 20,
	},
	modalText: {
		color: 'white',
		fontSize: 18,
		marginBottom: 20,
	},
})
