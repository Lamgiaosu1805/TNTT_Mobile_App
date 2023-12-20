import { ActivityIndicator, Alert, Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/AdminXuDoanScreens/HomeScreen'
import AddMemberScreen from '../screens/AdminXuDoanScreens/AddMemberScreen'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import utils from '../utils'
import { storeUser, resetUser } from '../redux/Slice/userSlice'
import { resetMemberXuDoan, storeListMemberXuDoan } from '../redux/Slice/memberXuDoanSlice'
import { storeCapKhan } from '../redux/Slice/capKhanSlice'
import { storeChucVu } from '../redux/Slice/chucVuSlice'
import * as Updates from 'expo-updates';

const Drawer = createDrawerNavigator()

export default function DrawerNavigator({route, navigation}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const listCapKhan = useSelector(state => state.capKhan);
    const listChucVu = useSelector(state => state.chucVu);

    const logout = async () => {
        Alert.alert(
            "Đăng xuất", 
            "Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này ?",
            [
               
                {
                    text: 'Huỷ',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            dispatch(resetMemberXuDoan());
                            dispatch(resetUser());
                            navigation.replace('SignIn')
                        } catch (error) {
                            console.log(error)
                        }
                    },
                    style: 'destructive',
                },
              ],
        )
    }

    useEffect(() => {
        AsyncStorage.getItem('currentUser')
            .then(user => axios.get(`${utils.apiUrl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                }
            }))
            .then(res => {
                const action = storeUser(res.data)
                dispatch(action);
            })
            .catch(e => console.log(e))
    }, []);
    useEffect(() => {
        getCapKhan();
    }, []);
    useEffect(() => {
        getChucVu();
    }, [])
    useEffect(() => {
        getMemberXuDoan();
    }, []);
    const getChucVu = async() => {
        try {
            const chucVu = (await axios.get(`${utils.apiUrl}/chucVu`)).data
            const action = storeChucVu(chucVu);
            dispatch(action)
        } catch (error) {
            console.log(`get chuc vu error ${error}`)
        }
    } 
    const getCapKhan = async() => {
        try {
            const capKhan = (await axios.get(`${utils.apiUrl}/capkhan`)).data
            const action = storeCapKhan(capKhan);
            dispatch(action)
        } catch (error) {
            console.log(`get cap khan error ${error}`)
        }
    }
    const getMemberXuDoan = async () => {
        try {
            const user = await  AsyncStorage.getItem('currentUser');
            const listMemberXuDoan = (await axios.get(`${utils.apiUrl}/xudoan/members`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                }
            })).data;
            dispatch(storeListMemberXuDoan(listMemberXuDoan.data));
        } catch (error) {
            console.log(`get list member xu doan error ${error}`)
        }
    }
    
    return (
        <View style={{flex: 1}}>
            {
                currentUser && listCapKhan && listChucVu
                ?
                <Drawer.Navigator
                    initialRouteName='Home'
                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: 'white',
                            width: Dimensions.get("window").width * 3 / 4,
                        },
                        drawerActiveTintColor: 'blue',
                        drawerLabelStyle: {
                            color: '#111',
                            fontSize: 20,
                        }
                    }}
                    drawerContent={
                        (props) => {
                            return(
                                <SafeAreaView style={{paddingVertical: Platform.OS == 'android' ? 20 : 0}}>
                                    <TouchableOpacity style={styles.drawerContent} activeOpacity={0.6}>
                                        <Image resizeMode='contain' source={currentUser.logoXuDoan ? {uri: currentUser.logoXuDoan} : require('../../assets/TNTT.png')} style={styles.logo}/>
                                        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 12, fontWeight: '500'}}>
                                            {currentUser.tenXuDoan.split('-')[0]}
                                        </Text>
                                    </TouchableOpacity>
                                    <DrawerItemList {...props}/>
                                    <TouchableOpacity activeOpacity={0.6} onPress={ async () => {
                                        try {
                                            const update = await Updates.checkForUpdateAsync();
                                            if (update.isAvailable) {
                                              Alert.alert("Thông báo", "Đã có bản cập nhật mới, vui lòng cập nhật", async () => {
                                                await Updates.fetchUpdateAsync();
                                                await Updates.reloadAsync();
                                              })
                                            }
                                          } catch (error) {
                                            alert(`Error fetching latest Expo update: ${error}`);
                                          }
                                    }}>
                                        <Text style={{fontSize: 20, marginTop: 20, marginLeft: 70, fontWeight: '500'}}>Check update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => {
                                        logout();
                                    }}>
                                        <Text style={{fontSize: 22, textAlign: 'center', marginTop: 40, fontWeight: '700', color:'red'}}>Đăng xuất</Text>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            )
                        }
                    }
                >
                    <Drawer.Screen name='Home'
                        component={HomeScreen}
                        options={{
                            drawerLabel: "Trang chủ",
                            drawerIcon: () => (
                                <AwesomeIcon name='home' size={20} color="#808080"/>
                            )
                        }}
                    />
                    <Drawer.Screen name='AddMember'
                        component={AddMemberScreen}
                        options={{
                            drawerLabel: "Thêm đoàn sinh",
                            drawerIcon: () => (
                                <AwesomeIcon name='user-plus' size={20} color="#808080"/>
                            )
                        }}
                    />
                    <Drawer.Screen name='AddMemberGLV'
                        component={AddMemberScreen}
                        options={{
                            drawerLabel: "Thêm giáo lý viênnnnn",
                            drawerIcon: () => (
                                <AwesomeIcon name='user-plus' size={20} color="#808080"/>
                            )
                        }}
                    />
                </Drawer.Navigator>
                :
                <View style={{justifyContent:'center', alignItems: 'center', flex: 1}}>
                    <ActivityIndicator size={'large'}/>
                    <Text>Đang tải dữ liệu...</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150
    },
})