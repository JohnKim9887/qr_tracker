import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window') // For responsive circular photo area

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		justifyContent: 'center',
		alignItems: 'center', // Center items horizontally
		backgroundColor: '#BAC9D6'
	},
	scrollContainer: {
		//backgroundColor: '#abdbe3',
		backgroundColor: '#BAC9D6',
		
		flexGrow: 1,
		padding: 14 // Allow the ScrollView to grow
		 // Add some padding around the content
		//alignItems: 'top'
	},
	topSmallHeader: {
		backgroundColor: '#666666',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	topSmallText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'left',
		width: '100%',
		marginTop: 10,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	titleContainer: {
		backgroundColor: '#003B5C',
		width: '100%',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#003d80',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	welcomeText: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		textAlign: 'center',
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	buttonSpacer: {
		width: 10,
	},
	descriptionBox: {
		backgroundColor: '#ffffff',
		padding: 15,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		width: '100%',
		marginBottom: 20,
	},
	titleText: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		width: '100%',
	},

	icon: {
		marginBottom: 0,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	projectCard: {
		backgroundColor: '#f8f8f8',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},

	projectTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},

	projectTitle: {
		fontSize: 18,
		marginRight: 5,
	},

	projectSmallDetail: {
		fontSize: 11,
		padding: 5,
		color: 'white',
		backgroundColor: '#87CEEB',
		borderRadius: 15,
	},

	projectArrow: {
		size: 16,
		color: 'blue',
	},
	debugInfo: {
		fontSize: 18,
		padding: 15,
		color: 'red',
	},
	projectHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	box: {
		backgroundColor: '#ffffff',
		padding: 20,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
		marginBottom: 20,
		width: '100%',
	},
	boxTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0056b3',
		marginBottom: 10,
	},
	descriptionText: {
		fontSize: 16,
		color: '#333',
		textAlign: 'left',
		lineHeight: 24,
	},
	buttonContainer: {
		marginTop: 20,
		width: '100%',
	},
	photoFullView: {
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	photoEmptyView: {
		borderWidth: 3,
		borderRadius: 200,
		borderColor: '#0056b3',
		borderStyle: 'dashed',
		width: height / 4,
		height: height / 4,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#b3e0ff',
	},
	photoFullImage: {
		width: '100%',
		height: '100%',
		borderRadius: 200,
	},
	inputView: {
		marginBottom: 20,
	},
	input: {
		height: 50,
		borderColor: '#0056b3',
		borderWidth: 1,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginBottom: 20,
		width: '100%',
		backgroundColor: '#ffffff',
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 20,
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
})

export default styles
