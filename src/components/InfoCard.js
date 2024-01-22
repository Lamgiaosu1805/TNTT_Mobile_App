import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import utils from '../utils'

export default function InfoCard({item, onPress, isSelected}) {
    //nếu chỉ show thì truyền isSelected = false
    return (
        <TouchableOpacity 
            style={[
                styles.container,
                {
                    backgroundColor: isSelected ? '#ADD8E6' : 'white'
                }
            ]} 
            onPress={onPress}
            activeOpacity={0.6}
        >
            <Text style={styles.text}>{item.saintName + " " + item.fullname}</Text>
            <Text>{`${utils.formatDate(item.dateOfBirth)}`}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        flex: 1,
        height: 120,
        marginHorizontal: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 1.41,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        padding: 8
    }
})