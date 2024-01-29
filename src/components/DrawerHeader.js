import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DrawerHeader({title, navigation, rightIcon, rightIconName, handlePressRightIcon}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.goBack()} activeOpacity={0.6}>
            <Ionicons name='chevron-back-outline' size={30}/>
        </TouchableOpacity>
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity style={{width: 30, height: 30}} activeOpacity={0.6} onPress={handlePressRightIcon}>
            {rightIcon == true && <Ionicons name={rightIconName} size={30}/>}
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 21,
        fontWeight: '600',
    }
})