import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function SignInScreens() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isHidePassword, setIsHidePassword] = useState(true);
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
                        onPress={() => console.log(`${username} ${password}`)}
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