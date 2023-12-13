import { Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isHidePassword, setIsHidePassword] = useState(true);
    // const dispatch = useDispatch()
    const checkToken = async () => {
        try {
            const token = AsyncStorage.getItem('accessToken');
            if(token) {
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkToken()
    }, []);
    const signIn = async() => {
        try {
            if(username == "" || password == "") {
                Alert.alert('Đăng nhập không thành công', "Tên đăng nhập và mật khẩu không được bỏ trống")
            }
            const responseData = await axios.post(`${utils.apiUrl}/auth/signIn`, {
                username: username,
                password: password
            });
            const data = responseData.data;
            const accessToken = data.accessToken;
            if(accessToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
                // const action = storeUser({
                //     token: accessToken
                // })
                // dispatch(action);
                navigation.navigate('Home');
            }
            else {
                Alert.alert('Đăng nhập không thành công', "Sai tên đăng nhập hoặc mật khẩu!")
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Có lỗi trong quá trình đăng nhập, vui lòng thử lại sau!')
        }
    }
    return (
        <ScrollView style={styles.container}>
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{alignItems: 'center', marginBottom: 40}}>
                        <Image source={require('../../assets/TNTT.png')} style={styles.logo}/>
                        <Text style={styles.titleText}>THIẾU NHI THÁNH THỂ VIỆT NAM</Text>
                    </View>
                    <View style={styles.inputArea}>
                        <Text style={styles.text}>TÊN ĐĂNG NHẬP</Text>
                        <TextInput style={styles.input} onChangeText={(value) => setUsername(value)} autoCapitalize='none'/>
                    </View>
                    <View style={styles.inputArea}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                            <Text style={styles.text}>MẬT KHẨU</Text>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => setIsHidePassword(!isHidePassword)}>
                                <AwesomeIcon name={!isHidePassword ? 'eye': 'eye-slash'} size={18} color={'grey'}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.input} secureTextEntry={isHidePassword} onChangeText={(value) => setPassword(value)} autoCapitalize='none'/>
                    </View>
                    <View style={{marginHorizontal: 40, justifyContent:'space-between', flexDirection:'row', marginTop: 24}}>
                        <View></View>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Text style={{fontSize: 16, fontWeight: '500', color:'grey'}}>
                                Quên mật khẩu
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={styles.signInBtn} 
                        activeOpacity={0.6}
                        onPress={() => {
                            signIn();
                        }}
                    >
                        <Text style={{fontSize: 20, color: '#ffed00', fontWeight: '600'}}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 52
    },
    logo: {
        width: 150,
        height: 150
    },
    titleText: {
        color: '#e60000',
        marginTop: 20,
        fontSize: 20,
        fontWeight: '700'
    },
    inputArea: {
        paddingHorizontal: 40,
        marginTop: 40
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#aaaaac'
    },
    input: {
        borderBottomColor: '#aaaaac',
        borderBottomWidth: 1,
        fontSize: 20,
        height: 40
    },
    signInBtn: {
        backgroundColor: '#e60000',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        height: 50,
        marginTop: 40,
        borderRadius: 4
    }
})