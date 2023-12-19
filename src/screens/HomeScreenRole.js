import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-paper';

export default function HomeScreenRole({navigation}) {
    const currentUser = useSelector(state => state.user);
    const renderView = useCallback(() => {
        if(currentUser) {
            switch (currentUser.role) {
                case 1:
                    break;
                case 2: 
                    break;
                case 3:
                    return(
                        <AdminXuDoanView />
                    )
                default:
                    return <></>

            }
        }
        else {
            return(
                <View>

                </View>
            )
        }
    }, [currentUser]);

    const AdminXuDoanView = useCallback(() => {
        const listMemberXuDoan = useSelector(state => state.memberXuDoan)
        return(
            <View style={styles.adminXuDoanContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.openDrawer()} activeOpacity={1}>
                        <AwesomeIcon name='bars' size={28} color={"white"}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, marginHorizontal: 8, alignItems: 'center'}}>
                        <Text style={styles.headerTitle}>
                            {currentUser.tenXuDoan.split("-")[0].trim()}
                        </Text>
                        <Text style={[styles.headerTitle, {marginTop: 4}]}>
                            {currentUser.tenXuDoan.split("-")[1].trim()}
                        </Text>
                    </View>
                    <TouchableOpacity style={{width: 30, height: 30}} activeOpacity={1}>
                        <AwesomeIcon name='bell' size={28} color={"white"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <View style={styles.rowItem}>
                        <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => navigation.navigate('ListMember')}>
                            <Badge style={{position: 'absolute', top: -8, right: -8, backgroundColor: 'red', fontSize: 16}} size={24}>{listMemberXuDoan.length}</Badge>
                            <Text style={styles.itemTitle}>
                                Danh sách thành viên
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.item}>

                        </View>
                    </View>
                    <View style={styles.rowItem}>
                        <View style={styles.item}>
                            
                        </View>
                        <View style={styles.item}>

                        </View>
                    </View>
                    <View style={styles.rowItem}>
                        <View style={styles.item}>
                            
                        </View>
                        <View style={styles.item}>

                        </View>
                    </View>
                </View>
            </View>
        )
    },[currentUser])

    return (
        renderView()
    )
}

const styles = StyleSheet.create({
    adminXuDoanContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 8,
        backgroundColor: '#e60000',
        paddingHorizontal: 16,

    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white'
    },
    content: {
        marginTop: 40
    },
    rowItem: {
        flexDirection: 'row',
        marginBottom: 32
    },
    item: {
        backgroundColor: 'white',
        height: 120,
        flex: 1,
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
    itemTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        margin: 4,
        padding: 8
    }
})