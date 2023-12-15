import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DrawerHeader(props) {
    const {title, navigation} = props;
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.navigate('Home')} activeOpacity={0.6}>
            <Ionicons name='chevron-back-outline' size={30}/>
        </TouchableOpacity>
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{width: 30, height: 30}}>
            {/* <Ionicons name='arrow-back-outline' size={20}/> */}
        </View>
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