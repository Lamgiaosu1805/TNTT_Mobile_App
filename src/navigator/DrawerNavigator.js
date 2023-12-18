import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import AddMemberScreen from '../screens/AddMemberScreen'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import utils from '../utils'
import { storeUser } from '../redux/Slice/userSlice'
import { storeListMemberXuDoan } from '../redux/Slice/memberXuDoanSlice'
import { storeCapKhan } from '../redux/Slice/capKhanSlice'
import { storeChucVu } from '../redux/Slice/chucVuSlice'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator({navigation}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    const listCapKhan = useSelector(state => state.capKhan);
    const listChucVu = useSelector(state => state.chucVu)

    useEffect(() => {
        AsyncStorage.getItem('accessToken')
            .then(token => axios.get(`${utils.apiUrl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
        getChucVu();
    }, []);
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
            const token = await  AsyncStorage.getItem('accessToken');
            const listMemberXuDoan = (await axios.get(`${utils.apiUrl}/xudoan/members`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
                                <SafeAreaView>
                                    <TouchableOpacity style={styles.drawerContent} activeOpacity={0.6}>
                                        <Image source={require('../../assets/TNTT.png')} style={styles.logo}/>
                                        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 12, fontWeight: '500'}}>
                                            {currentUser.tenXuDoan.split('-')[0]}
                                        </Text>
                                    </TouchableOpacity>
                                    <DrawerItemList {...props}/>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => utils.logout(navigation)}>
                                        <Text style={{fontSize: 22, textAlign: 'center', marginTop: 20, fontWeight: '700', color:'red'}}>Đăng xuất</Text>
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
                            drawerLabel: "Thêm thành viên",
                            drawerIcon: () => (
                                <AwesomeIcon name='user-plus' size={20} color="#808080"/>
                            )
                        }}
                    />
                </Drawer.Navigator>
                :
                <View></View>
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