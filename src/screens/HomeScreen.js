import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function HomeScreen() {
    // const currentUser = useSelector(state => state.user);
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {/* <Text>{currentUser.token}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({})