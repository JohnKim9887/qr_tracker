
const API_BASE_URL = 'https://comp2140-bb547a61.uqcloud.net/api'
const JWT_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.Jxdp2e1IIlgoTuOlgAVwcIKoHVfAQKKLohFyQadWTbA'
export const USERNAME = 's4742320'

/**
 * Makes an API request to the specified endpoint.
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH, DELETE).
 * @param {object|null} [body=null] - The request body to send (if applicable).
 * @returns {Promise<object|null>} The response data parsed as JSON or null for 204 responses.
 * @throws {Error} Throws an error if the response is not OK.
 */
export async function apiRequest(endpoint, method = 'GET', body = null) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${JWT_TOKEN}`,
		},
	}

	if (method === 'POST' || method === 'PATCH') {
		options.headers['Prefer'] = 'return=representation'
	}

	if (body) {
		options.body = JSON.stringify({ ...body, username: USERNAME })
	}

	const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
	console.log('Response Status:', response.status)
	const responseBody = await response.text()
	//console.log('Response Body:', responseBody)

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status} - ${responseBody}`)
	}

	if (response.status === 204) {
		return null
	}

	return JSON.parse(responseBody)
}

