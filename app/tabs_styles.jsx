import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window') // For responsive circular photo area

const tabs_styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#BAC9D6',
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: 'black',
    },
    nearbyLocationView: {
        padding: 20,
    },
    nearbyLocationText: {
        color: 'white',
        lineHeight: 25,
    },
    titleContainer: {
		backgroundColor: '#4A6E91',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#2F4F4F',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#f7f9fc',
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#d4e8fc', // Light blue background
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    projectText: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 5,
        textAlign: 'left',
        paddingHorizontal: 15,
    },
    projectInfo: {
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 15,
        color: '#333',
    },
	smallLocationInfo: {
        fontSize: 14,
        marginVertical: 2,
        paddingHorizontal: 20,
        color: '#333',
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
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
    map: {
        width: '100%',
        height: '100%',
    },

})

export default tabs_styles
