import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DrawerHeader from '../../components/DrawerHeader'
import { useSelector } from 'react-redux'
import utils from '../../utils';

export default function XuDoanInfoScreen({navigation}) {
    const currentUser = useSelector(state => state.user);
    const memberXuDoan = useSelector(state => state.memberXuDoan);
    const listDoanSinh = useMemo(() => {
        return utils.filterDoanSinh(memberXuDoan);
    }, [currentUser, memberXuDoan]);

    const listGLV = useMemo(() => {
        return utils.filterGLV(memberXuDoan);
    }, [currentUser, memberXuDoan]);

    const ngayThanhLap = useMemo(() => {
        try {
            const date = new Date(currentUser.ngayThanhLap);
            const day = date.getDay() + 1;
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day} - ${month} - ${year}`
       } catch (error) {
            console.log("parse Date error");
            return ""
       }
    }, [currentUser]);
    
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
                    <Text style={styles.contentText}>{ngayThanhLap}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.titleText}>Số đoàn sinh: </Text>
                    <Text style={styles.contentText}>{listDoanSinh.length}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.titleText}>Số giáo lý viên: </Text>
                    <Text style={styles.contentText}>{listGLV.length}</Text>
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
        paddingHorizontal: 18,
        alignItems: 'flex-end',
        marginBottom: 12
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500'
    },
    contentText: {
        fontSize: 18,
        marginLeft: 12,
    }
})