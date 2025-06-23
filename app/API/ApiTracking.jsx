import { apiRequest, USERNAME } from './ApiRequest'

/**
 * Creates a new tracking entry for a project.
 * @param {object} tracking - The tracking data to create.
 * @returns {Promise<object>} The created tracking data.
 */
async function postTracking(tracking) {
	return apiRequest('/tracking', 'POST', tracking)
}

/**
 * Adds a new tracking entry via the API.
 *
 * @param {Object} params - The parameters for adding tracking.
 * @param {number} params.project_id - The ID of the project to which the tracking belongs.
 * @param {number} params.location_id - The ID of the location associated with the tracking.
 * @param {number} params.points - The points received by the participant.
 * @param {string} params.username - The username of the student.
 * @param {string} params.participant_username - The participant's username.
 * @throws {Error} Throws an error if tracking addition fails.
 */
async function addTrackingAPI({
	project_id,
	location_id,
	points,
	participant_username,
}) {
	try {
		const newTracking = {
			project_id: project_id,
			location_id: location_id,
			points: points,
			username: USERNAME,
			participant_username: participant_username,
		}
		console.log('Creating Tracking with:', newTracking)

		const createdTracking = await postTracking(newTracking)
		console.log('Created Tracking:', createdTracking)
	} catch (error) {
		console.error('Error adding tracking:', error.message)
	}
}

async function getProjectTracking(projectId) {
	return apiRequest(`/tracking?project_id=eq.${projectId}`)
}

async function getProjectUserTracking(projectId, username) {
	return apiRequest(
		`/tracking?project_id=eq.${projectId}&participant_username=eq.${username}`
	)
}

async function getUserTrackingScore(projectId, username) {
	try {
		const trackingData = await getProjectUserTracking(projectId, username)

		let totalScore = 0 // Initialize total score
		console.log('CURRNELTY:', trackingData)
		// Loop through each entry in trackingData
		for (const entry of trackingData) {
			if (entry.points) {
				// Check if score exists
				totalScore += entry.points // Add score to total score
			}
		}

		return totalScore // Return the total score
	} catch (error) {
		console.error('Error fetching tracking data:', error)
		throw error // Re-throw the error for further handling
	}
}

async function getUserTracking(userName) {
	return apiRequest(`/tracking?username=eq.${userName}`) // Include projectId in the request
}

/**
 * Adds a new random tracking entry via the API.
 *
 * @throws {Error} Throws an error if tracking addition fails.
 */
async function randomAddTracking() {
	try {
		const projectIds = 21
		const locationIds = 100
		const participantUsernames = [
			'participantA',
			'participantB',
			'participantC',
		]

		// Generating random values
		const randomTracking = {
			project_id: 2,
			location_id: 74,
			points: 10,
			participant_username: 'participantA',
		}

		console.log('Creating Random Tracking with:', randomTracking)

		// API call to add tracking entry
		const createdTracking = await postTracking(randomTracking)
		console.log('Created Random Tracking:', createdTracking)
		return createdTracking
	} catch (error) {
		console.error('Error adding random tracking:', error.message)
	}
}

export {
	postTracking,
	addTrackingAPI,
	getProjectTracking,
	getUserTracking,
	randomAddTracking,
	getUserTrackingScore,
	getProjectUserTracking,
}
