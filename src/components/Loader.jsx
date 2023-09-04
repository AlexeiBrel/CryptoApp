import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loader() {
    return (
        <View style={styles.wrap}>
            <ActivityIndicator size='large' color="#FFFFFF" />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212'
    }
})