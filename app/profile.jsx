import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Image,
    Dimensions,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from './UserContext'
import { Feather } from '@expo/vector-icons'
import styles from './styles'

const ProfileHeader = () => {
    return (
        <View style={styles.titleContainer}>
            {/* Add Feather icon */}
            <Feather name="user" size={50} color="white" style={styles.icon} />
            <Text style={styles.titleText}>Your Profile</Text>
        </View>
    )
}

const SmallProfileHeader = () => {
    return (
        <View style={styles.topSmallHeader}>
            <Text style={styles.topSmallText}>Profile</Text>
        </View>
    )
}

// Get the screen width and height for styling
const { height } = Dimensions.get('window')

export default function Profile() {
    const [photoState, setPhotoState] = useState({})
    const { userName, setUserName } = useUser()

    async function handleChangePress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhotoState(result.assets[0])
        }
    }

    async function handleRemovePress() {
        setPhotoState({})
    }

    const hasPhoto = Boolean(photoState.uri)

    function Photo() {
        if (hasPhoto) {
            return (
                <View style={styles.photoFullView}>
                    <Image
                        style={styles.photoFullImage}
                        resizeMode="cover"
                        source={{ uri: photoState.uri }}
                    />
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={handleChangePress}
                    style={styles.photoEmptyView}
                >
                    <Text style={styles.photoText}>No Photo Selected</Text>
                </TouchableOpacity>
            )
        }
    }

    // Main render of the App component
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SmallProfileHeader />
            <ProfileHeader />
            <View style={styles.container}>
                {/* Image section */}
                <Photo />

                {/* Input and Button section at the bottom */}
                <View style={styles.inputView}>
                    <Text style={styles.label}>Enter your name:</Text>
                    <TextInput
                        value={userName}
                        onChangeText={setUserName}
                        placeholder="Type here..."
                        style={styles.input}
                    />
                </View>
                {/* Display the current userName */}
                <View style={styles.userNameDisplay}>
                    <Text style={styles.userNameText}>
                        Current User Name: {userName || 'Not Set'}
                    </Text>
                </View>

                <View style={styles.buttonView}>
                    {hasPhoto && (
                        <Button
                            onPress={handleRemovePress}
                            title="Remove Photo"
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}
