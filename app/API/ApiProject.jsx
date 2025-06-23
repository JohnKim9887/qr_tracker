import { apiRequest } from './ApiRequest'

/**
 * Creates a new project.
 * @param {object} project - The project data to create.
 * @returns {Promise<object>} The created project data.
 */
async function postProject(project) {
	console.log('HELLO')
	return apiRequest('/project', 'POST', project)
}

async function getAllPublishedProjects() {
	return apiRequest(`/project?is_published=eq.${true}`)
}

async function getAllProjects() {
	return apiRequest('/project')
}
/**
 * Retrieves a single project by ID.
 * @param {number} id - The ID of the project to retrieve.
 * @returns {Promise<object>} The project data.
 */

async function getOneProject(id) {
	return apiRequest(`/project?id=eq.${id}`) // Include the id in the request
}
/**
 * Adds a new project via the API.
 * @param {object} projectData - The project data to add.
 * @param {string} projectData.title - The title of the project.
 * @param {string} projectData.description - The description of the project.
 * @param {string} projectData.instructions - Instructions related to the project.
 * @param {string} projectData.initialClue - The initial clue for the project.
 * @param {boolean} projectData.homescreenDisplay - Whether the project is displayed on the homescreen.
 * @param {boolean} projectData.isPublished - Whether the project is published.
 * @param {boolean} projectData.participantScoring - Scoring mechanism for participants.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if project creation or retrieval fails.
 */

async function addProjectAPI({
	title,
	description,
	instructions,
	initialClue,
	homescreenDisplay,
	isPublished,
	participantScoring,
}) {
	try {
		const newProject = {
			title,
			description,
			instructions,
			initial_clue: initialClue,
			homescreen_display: homescreenDisplay,
			is_published: isPublished,
			participant_scoring: participantScoring,
		}

		const createdProject = await postProject(newProject)
		console.log('Created Project:', createdProject)

		const allProjects = await getAllProjects()
		console.log('All Projects:', allProjects)

		if (allProjects.length > 0) {
			const singleProject = await getOneProject(allProjects[0].id)
			console.log('Single Project:', singleProject)
		}
	} catch (error) {
		console.error('Error:', error.message)
	}
}
/**
 * Deletes a project by ID.
 * @param {number} projectId - The ID of the project to delete.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if project deletion fails.
 */

async function deleteProjectAPI(projectId) {
	const endpoint = `/project?id=eq.${projectId}` // Adjust the endpoint based on your API
	const method = 'DELETE' // Use DELETE to remove the project

	try {
		const response = await apiRequest(endpoint, method)
		console.log('Project deleted successfully:', response)
		return response
	} catch (error) {
		console.error('Error deleting project:', error)
		throw error
	}
}
/**
 * Creates a random project.
 * @returns {Promise<object>} The created project data.
 */

async function randomAddProject() {
	const titles = [
		'Tales of Phantasia',
		'Tales of Destiny',
		'Tales of Eternia',
		'Tales of Destiny II',
		'Tales of Symphonia',
		'Tales of Rebirth',
		'Tales of Legendia',
		'Tales of the Abyss',
		'Tales of Innocence',
		'Tales of Vesperia',
		'Tales of Hearts',
		'Tales of Graces',
		'Tales of Xillia',
		'Tales of Xillia 2',
		'Tales of Zestiria',
		'Tales of Berseria',
		'Tales of Arise',
	]
	const descriptions = ['Tales of game series made for weebs by bandai namco']
	const instructions = 'Follow the clues and complete the challenges.'
	const initialClue = 'Start at the old oak tree.'
	const homescreenDisplay = ['Display initial clue', 'Display all locations'] // Random boolean
	const isPublished = true 
	const participantScoring = [
		'Not Scored',
		'Number of Scanned QR Codes',
		'Number of Locations Entered',
	] 

	const randomProject = {
		title: titles[Math.floor(Math.random() * titles.length)],
		description:
			descriptions[Math.floor(Math.random() * descriptions.length)],
		instructions,
		initial_clue: initialClue,
		homescreen_display: homescreenDisplay[1],
		is_published: isPublished,
		participant_scoring: participantScoring[2],
	}
	return postProject(randomProject)
}

export {
	postProject,
	getAllProjects,
	getOneProject,
	addProjectAPI,
	deleteProjectAPI,
	randomAddProject,
	getAllPublishedProjects,
}
