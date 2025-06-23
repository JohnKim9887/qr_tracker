import { apiRequest } from './ApiRequest'
import { locations } from '../data/locations'

export async function getAllLocations(projectId) {
	return apiRequest(`/location?project_id=eq.${projectId}`)
}

export async function getAllLocationScore(projectId) {
	try {
		const locationsData = await getAllLocations(projectId)

		const totalScore = locationsData.reduce((sum, location) => {
			return sum + (location.score_points || 0)
		}, 0)

		return totalScore
	} catch (error) {
		console.error('Error fetching location data:', error)
		throw error
	}
}

export async function getOneLocation(projectId, locationId) {
	return apiRequest(
		`/location?project_id=eq.${projectId}&id=eq.${locationId}`
	)
}

export async function postLocation(location) {
	return apiRequest('/location', 'POST', location)
}

export async function deleteLocationAPI(projectId, locationId) {
	const endpoint = `/location?project_id=eq.${projectId}&id=eq.${locationId}`
	const method = 'DELETE'
	try {
		await apiRequest(endpoint, method)
		console.log('Location removed successfully.')
	} catch (error) {
		console.error('Error removing location:', error)
	}
}

export async function addLocationAPI({
	project_id,
	location_name,
	location_trigger,
	location_position,
	location_content,
	extra,
	clue,
	score_points,
}) {
	try {
		const existingLocations = await getAllLocations(project_id)
		const location_order = existingLocations.length + 1

		const newLocation = {
			project_id,
			location_name,
			location_trigger,
			location_position,
			location_order,
			location_content,
			extra,
			clue,
			score_points,
		}

		console.log('Creating Location with:', newLocation)

		const createdLocation = await postLocation(newLocation)
		console.log('Created Location:', createdLocation)

		const allLocations = await getAllLocations(project_id)
		console.log('All Locations:', allLocations)

		if (allLocations.length > 0) {
			const singleLocation = await getOneLocation(
				project_id,
				allLocations[0].id
			)
			console.log('Single Location:', singleLocation)
		}
	} catch (error) {
		console.error('Error:', error.message)
	}
}
/**
 * Creates a random location for a specified project and inserts it into the database.
 * @param {number} projectId - The ID of the project to which the location belongs.
 * @returns {Promise<object>} The created location data.
 */

export async function randomAddLocation(projectId) {
	const existingLocations = await getAllLocations(projectId)
	const location_order = existingLocations.length + 1 // Ensure location_order is not null

	// Define location name, trigger, and content as simple strings
	const locationName = `Placeholder Random Location Name ${location_order}`

	const locationTrigger = 'Placeholder Random Trigger'
	const locationContent = 'Placeholder Random Content'

	const clue = 'Placeholder Random Clue.'
	const scorePoints = Math.floor(Math.random() * 50) // Random points

	const randomLocation = {
		project_id: projectId,
		location_name: locationName,
		location_trigger: locationTrigger,
		location_position: `${Math.random().toFixed(
			2
		)}, ${Math.random().toFixed(2)}`,
		extra: 'whatever',
		clue: clue,
		score_points: scorePoints,
		location_content: locationContent,
		location_order: location_order,
	}

	const createdLocation = await postLocation(randomLocation)
	console.log('Created Location:', createdLocation)

	return createdLocation
}

export async function randomAddTenLocation(projectId) {
    const existingLocations = await getAllLocations(projectId);
    const locationOrder = existingLocations.length + 1;

    for (let i = 0; i < locations.length; i++) {
        const loc = locations[i];

        const randomLocation = {
            project_id: projectId,
            location_name: loc.location,
            location_trigger: 'Placeholder Trigger',
            location_position: loc.latlong.trim(),
            extra: 'whatever',
            clue: 'Placeholder Random Clue.',
            score_points: 10,
            location_content: 'Placeholder Random Content',
            location_order: locationOrder + i,
        };
		
        const createdLocation = await postLocation(randomLocation);
        console.log('Created Location:',i, createdLocation);
    }
}