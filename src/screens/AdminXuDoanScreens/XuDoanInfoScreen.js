import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DrawerHeader from '../../components/DrawerHeader'
import { useSelector } from 'react-redux'

export default function XuDoanInfoScreen({navigation}) {
    const currentUser = useSelector(state => state.user);
    return (
        <SafeAreaView style={[styles.container, {paddingVertical: Platform.OS=='android' ? 20 : 0}]}>
            <DrawerHeader title="Thông tin xứ đoàn" navigation={navigation}/>
            <View style={styles.content}>
                <View style={{alignItems: 'center', marginBottom: 40}}>
                    <Image source={{uri: currentUser.detailXuDoan.logoUrl, cache: 'force-cache'}} resizeMode='contain' style={styles.logo}/>
                    <Text style={styles.logoText}>{currentUser.tenXuDoan}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.titleText}>Ngày thành lập: </Text>
                    <Text style={styles.contentText}>{currentUser.ngayThanhLap}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        marginTop: 20,
    },
    logo: {
        width: 150,
        height: 150
    },
    logoText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 16
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'flex-end'
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500'
    },
    contentText: {
        fontSize: 16
    }
})