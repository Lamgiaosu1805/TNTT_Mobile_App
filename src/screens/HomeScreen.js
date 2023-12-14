import { StyleSheet, View } from 'react-native'
import React from 'react'
import HomeScreenRole from './HomeScreenRole';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <HomeScreenRole navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})