import { ActivityIndicator, Alert, Keyboard, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DrawerHeader from '../../components/DrawerHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'
import utils from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addClass, storeClass } from '../../redux/Slice/classSlice'

export default function ClassScreen({navigation}) {
    const [isShow, setIsShow] = useState(false)
    const [capKhan, setCapKhan] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [tenLop, setTenLop] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    //classes là danh sách các lớp
    const Item = ({title, classes}) => (
        classes && classes.length > 0
        ?
        <View style={styles.item}>
            <Text style={styles.textItem}>{title}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                    classes.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.classItem} activeOpacity={0.6}>
                            <Text style={{fontSize: 16}}>{`Lớp ${item.name}`}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
        :
        <></>
    );
    const getListClass = async () => {
        try {
            const res = await axios.get(`${utils.apiUrl}/xudoan/class/${currentUser.idXuDoan}`);
            const action = storeClass(res.data.data);
            dispatch(action);
        } catch (error) {
            alert("Có lỗi trong quá trình lấy dữ liệu, vui lòng thử lại sau !")
        }
    }
    const currentUser = useSelector(state => state.user);
    const listClass = useSelector(state => state.classes);
    const listCapKhan = useSelector(state => state.capKhan).filter(
        (e) => 
          e._id != "6568504d160bbc528d507af6" && 
          e._id != "6568505a160bbc528d507af8" && 
          e._id != "6568505e160bbc528d507afa" &&
          e._id != "65685062160bbc528d507afc" &&
          e._id != "6568507b160bbc528d507afe" &&
          e._id != "65685084160bbc528d507b00" &&
          e._id != "6568508d160bbc528d507b02" &&
          e._id != "6568509b160bbc528d507b04" &&
          e._id != "656850ac160bbc528d507b06" &&
          e._id != "656850b8160bbc528d507b08" &&
          e._id != "65684fdd160bbc528d507ae8" &&
          e._id != "6568500d160bbc528d507aec" &&
          e._id != "65685024160bbc528d507af0" &&
          e._id != "6568503e160bbc528d507af4"
    )
    
    const listClassByLevel = useCallback((idCapKhan) => {
        const listFiltered = listClass.filter((item) => item.idCapKhan == idCapKhan)
        return listFiltered
    })
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };
    const showModalCreateClass = () => {
        setIsShow(true);
    };
    const createClass = async () => {
        setLoading(true)
        if(capKhan == null || tenLop == "") {
            setLoading(false)
            Alert.alert("Thông báo", "Tên lớp và ngành không được bỏ trống");
        }
        else{
            try {
                const user = await  AsyncStorage.getItem('currentUser');
                const body = {
                    name: tenLop,
                    idCapKhan: capKhan,
                    idXuDoan: currentUser.idXuDoan
                }
                const res = await axios.post(`${utils.apiUrl}/xudoan/class/create`, body, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(user).token}`
                    }
                });
                setLoading(false);
                const action = addClass(res.data.data);
                dispatch(action)
                Alert.alert("Thông báo", `Lớp \"${res.data.data.name}\" được tạo thành công`);
                
            } catch (error) {
                setLoading(false)
                alert("Có lỗi trong quá trình tạo lớp, vui lòng thử lại sau !")
            }
        }
    }

    useEffect(() => {
        getListClass();
    }, [])
    return (
        <SafeAreaView style={[styles.container, {paddingVertical: Platform.OS=='android' ? 20 : 0}]}>
            {
                isShow && (
                    <TouchableOpacity onPress={() => {setIsShow(false)}}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={isShow}
                        >
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                                <View style={{width: '90%', height: '50%', backgroundColor: 'white', borderRadius: 12, padding: 16}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{width: 30, height: 30}}></View>
                                        <TouchableWithoutFeedback style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                                            setIsShow(false)
                                            setCapKhan(null)
                                        }}>
                                            <Ionicons name='close' size={24}/>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '500'}}>Thêm lớp</Text>
                                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                        <View style={{flex:1, padding: 8}}>
                                            <TextInput placeholder='Tên lớp' style={{marginVertical: 16}} onChangeText={(value) => setTenLop(value)}/>
                                            <Dropdown
                                                style={[styles.dropdown]}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                data={listCapKhan}
                                                labelField="name"
                                                valueField="_id"
                                                placeholder={!isFocus ? 'Ngành' : '...'}
                                                value={capKhan}
                                                onFocus={() => setIsFocus(true)}
                                                onBlur={() => setIsFocus(false)}
                                                onChange={item => {
                                                    setCapKhan(item._id);
                                                }}
                                                renderItem={renderItem}
                                                autoScroll={false}
                                                mode='auto'
                                                dropdownPosition='auto'
                                            />
                                            <View style={{alignItems: 'center', marginTop: 20}}>
                                                <TouchableOpacity style={{backgroundColor: '#ADD8E6', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16}} onPress={() => {
                                                    loading ? null : createClass();
                                                }}>
                                                    {
                                                        loading ? <ActivityIndicator size={20}/> : <Text style={{fontSize: 16, fontWeight: 500}}>Tạo</Text>
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                )
            }
            <DrawerHeader navigation={navigation} title={"Lớp học"} rightIcon={true} rightIconName={"add"} handlePressRightIcon={() => showModalCreateClass()}/>
            <Item title="Ngành Chiên" classes={listClassByLevel("65684f99160bbc528d507ae0")}/>
            <Item title="Ngành Ấu" classes={listClassByLevel("65684fac160bbc528d507ae6")}/>
            <Item title="Ngành Thiếu" classes={listClassByLevel("65684ff6160bbc528d507aea")}/>
            <Item title="Ngành Nghĩa" classes={listClassByLevel("6568501d160bbc528d507aee")}/>
            <Item title="Ngành Hiệp" classes={listClassByLevel("65685034160bbc528d507af2")}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        marginVertical: 16,
        marginHorizontal: 16
    },
    textItem: {
        fontSize: 18,
        fontWeight: '500'
    },
    dropdown: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    classItem: {
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 8
    }
})