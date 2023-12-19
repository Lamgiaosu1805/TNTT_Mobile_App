import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import utils from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ListMemberScreen({navigation}) {
    const allMember = useSelector(state => state.memberXuDoan);
    const listMember = useMemo(() => {
        return allMember.filter((e) => e.isDelete == false);
    }, [allMember])
    const listCapKhan = useSelector(state => state.capKhan);
    const listChucVu = useSelector(state => state.chucVu);

    const renderCapKhan = (id) => {
        const capKhan = listCapKhan.find((e) => e._id == id);
        return capKhan.name
    }

    const renderChucVu = (listIdChucVu) => {
        const chucVu = listIdChucVu.map((id) => listChucVu.find((e) => e._id == id).name);
        var listRender = ""
        chucVu.forEach((element, index) => {
            listRender += `${element}${index == chucVu.length - 1 ?"": ", "}`
        });
        return listRender;
    }

    const Item = ({item}) => (
        <View style={styles.item} key={item._id}>
            <View>
                <Text style={[styles.infoText, {fontWeight: '600', fontSize: 20}]}>{`${item.saintName} ${item.fullname}`}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                    <Text style={[styles.infoText, {fontWeight: '600', fontSize: 20}]}>Ngày Sinh: </Text>
                    <Text style={styles.infoText}>{`${utils.formatDate(item.dateOfBirth)}`}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                    <Text style={[styles.infoText, {fontWeight: '600', fontSize: 20}]}>Cấp: </Text>
                    <Text style={styles.infoText}>{`${renderCapKhan(item.idCapKhan)}`}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                    <Text style={[styles.infoText, {fontWeight: '600', fontSize: 20}]}>Chức vụ: </Text>
                    <Text style={styles.infoText}>{`${renderChucVu(item.idChucVuXuDoan)}`}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{width: 30, height: 30}} activeOpacity={0.6} onPress={() => {
                    Alert.alert(
                        "Xoá thành viên", 
                        "Bạn có chắc chắn muốn xoá thành viên này ?",
                        [
                           
                            {
                                text: 'Huỷ',
                                style: 'cancel',
                            },
                            {
                                text: 'Đồng ý',
                                onPress: async () => {
                                    try {
                                        // await AsyncStorage.clear();
                                        // navigation.replace('SignIn')
                                    } catch (error) {
                                        console.log(error)
                                    }
                                },
                                style: 'destructive',
                            },
                          ],
                    )
                }}>
                    <FontAwesome5 name='trash' size={20}/>
                </TouchableOpacity>
            </View>
        </View>
    )
    
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.header}>
                <TouchableOpacity style={{width: 30, height: 30}} onPress={() => navigation.goBack()} activeOpacity={1}>
                    <Ionicons name='chevron-back-outline' size={28} color={"white"}/>
                </TouchableOpacity>
                <View style={{flex: 1, marginHorizontal: 8, alignItems: 'center'}}>
                    <Text style={styles.headerTitle}>
                        Thành viên Xứ Đoàn
                    </Text>
                </View>
                <TouchableOpacity style={{width: 30, height: 30}} activeOpacity={1}>
                    <Ionicons name='search' size={28} color={"white"}/>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 16}}>
                {
                    listMember.length == 0
                    ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Chưa có dữ liệu</Text>
                    </View>
                    :
                    <FlatList 
                        bounces={false}
                        data={listMember}
                        renderItem={({item}) => <Item item={item}/>}
                        key={(item) => item._id}
                    />
                }
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 1.41,
        elevation: 2,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: '#e60000',
        paddingHorizontal: 16,

    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white'
    },
    infoText: {
        fontSize: 18
    }
})