// UserContext.js
import React, { createContext, useContext, useState, useCallback } from 'react'

// Create the User Context
const UserContext = createContext()

// UserProvider component that will wrap the app
export const UserProvider = ({ children }) => {
	const [userName, setUserName] = useState('Guest')
	const [projectId, setProjectId] = useState(null) // Add projectId to context
	const [refresh, setRefresh] = useState(false)
	const [locationPermission, setLocationPermission] = useState(false)
	const [useLocationQrBoth, setUseLocationQrBoth] = useState("both")

	const refreshData = useCallback(() => setRefresh((prev) => !prev), [])
	return (
		<UserContext.Provider
			value={{
				userName,
				setUserName,
				projectId,
				setProjectId,
				refresh,
				setRefresh,
				refreshData,
				locationPermission,
				setLocationPermission,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext)
