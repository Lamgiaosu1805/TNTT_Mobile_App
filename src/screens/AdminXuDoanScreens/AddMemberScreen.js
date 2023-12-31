import { ActivityIndicator, Alert, Keyboard, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import DrawerHeader from '../../components/DrawerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMemberXuDoan } from '../../redux/Slice/memberXuDoanSlice';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal } from 'react-native-paper';

export default function AddMemberScreen({route, navigation}) {
  const [saintName, setSaintName] = useState("");
  const [fullname, setFullname] = useState("");
  const [capKhan, setCapKhan] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [chucVuselected, setChucVuSelected] = useState([]);
  const [date, setDate] = useState(new Date);
  const [loading, setLoading] = useState(false);
  const [isVisibleModal, setIsvisibleModal] = useState(false);
  const dispatch = useDispatch();
  
  const listCapKhan = route.name == "AddMember" ? useSelector(state => state.capKhan).filter(
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
      e._id != "656850b8160bbc528d507b08"
    ) : 
    useSelector(state => state.capKhan).filter(
      (e) => 
        e._id == "6568504d160bbc528d507af6" || 
        e._id == "6568505a160bbc528d507af8" || 
        e._id == "6568505e160bbc528d507afa" ||
        e._id == "65685062160bbc528d507afc"
        // e._id == "6568507b160bbc528d507afe" ||
        // e._id == "65685084160bbc528d507b00" 
        // e._id == "6568508d160bbc528d507b02" ||
        // e._id == "6568509b160bbc528d507b04" ||
        // e._id == "656850ac160bbc528d507b06" ||
        // e._id == "656850b8160bbc528d507b08"
      )
  const currentUser = useSelector(state => state.user);
  const listChucVu = useSelector(state=> state.chucVu);

  const onChange = ({type}, selectedDate) => {
    if(type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if(Platform.OS === 'android') {
        setIsvisibleModal(!isVisibleModal);
        setDate(currentDate);
      }
    }
    else {
      setIsvisibleModal(!isVisibleModal)
    }
  }

  const addMember = async(body) => {
    if(saintName == "" || fullname == "" || capKhan == null){
      Alert.alert("Thông báo", "Tên thánh, Họ và tên, Cấp khăn không được bỏ trống !")
    }
    else {
      setLoading(true)
      AsyncStorage.getItem('currentUser')
        .then(user => axios.post(`${utils.apiUrl}/xudoan/member/create`, body, {
          headers: {
            Authorization: `Bearer ${JSON.parse(user).token}`
          }
        }))
        .then(res => {
            if(res.data.code == 200) {
              Alert.alert("Thông báo", "Thêm thành viên thành công !")
              setFullname("");
              setSaintName("");
              setCapKhan(null);
              setChucVuSelected([]);
              setDate(new Date);
              dispatch(addMemberXuDoan(res.data.data))
            }
            else {
              console.log(res.data);
              Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại !");
            }
        })
        .catch(e => {
          console.log(e);
          Alert.alert("Lỗi", "Thêm thành viên không thành công !")
        })
        .finally(() => setLoading(false))
    }
  }

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {paddingVertical: Platform.OS=='android' ? 20 : 0}]}>
        <DrawerHeader title={route.name == "AddMember" ? "Thêm đoàn sinh" : "Thêm giáo lý viên"} navigation={navigation}/>
        {
          isVisibleModal && Platform.OS === "android" && (
            <Pressable onPress={() => setIsvisibleModal(false)}>
              <DateTimePicker
                mode="date"
                display='spinner'
                value={date}
                onChange={onChange}
                locale='vi'
                style={{borderRadius: 20}}
              />
            </Pressable>
          )
        }
        {
          Platform.OS==="ios" && (
            <Portal>
              <Modal visible={isVisibleModal} contentContainerStyle={styles.modal} dismissable={false}>
                <DateTimePicker
                  mode="date"
                  display='spinner'
                  value={date}
                  onChange={onChange}
                  locale='vi'
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity style={{paddingHorizontal: 40, paddingVertical: 20}} activeOpacity={1} onPress={onChange}>
                    <Text style={{fontSize: 18, fontWeight: '600', color: 'blue'}}>
                      Xong
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Portal>
          )
        }
        <ScrollView style={styles.content}>
          <View style={[styles.inputArea, {marginBottom: 40}]}>
            <Text style={styles.inputTitle}>Tên Thánh</Text>
            <TextInput style={styles.input} onChangeText={(value) => setSaintName(value)} autoCapitalize='none' value={saintName}/>
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.inputTitle}>Họ và tên</Text>
            <TextInput style={styles.input} autoCapitalize='none' onChangeText={(value) => {setFullname(value)}} value={fullname}/>
          </View>
          <View style={styles.dob}>
            <Text style={styles.inputTitle}>Ngày sinh</Text>
            <TouchableOpacity 
              style={{marginLeft: 16, paddingHorizontal: 32, paddingVertical: 12, borderWidth: 1, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'grey'}}
              activeOpacity={0.6}
              onPress={() => {setIsvisibleModal(true)}}
            >
              <Text style={{fontSize: 16, fontWeight: '500'}}>{date.toLocaleDateString('en-GB')}</Text>
              <FontAwesome5Icon name='pen' size={16} style={{marginLeft: 8}} color={"grey"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.optionArea}>
            <View style={styles.capKhan}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                data={listCapKhan}
                labelField="name"
                valueField="_id"
                placeholder={!isFocus ? route.name == "AddMember" ? 'Ngành' : 'Cấp hiệu' : '...'}
                value={capKhan}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCapKhan(item._id);
                  setIsFocus(false);
                }}
                renderItem={renderItem}
                autoScroll={false}
                mode='auto'
                dropdownPosition='auto'
              />
            </View>
            {
              route.name == "AddMemberGLV" && (
                <View style={[styles.capKhan, {marginTop: 0}]}>
                  <MultiSelect
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={listChucVu}
                    labelField="name"
                    valueField="_id"
                    placeholder="Chức vụ"
                    placeholderStyle={styles.placeholderStyle}
                    value={chucVuselected}
                    onChange={item => {
                      setChucVuSelected(item);
                    }}
                    selectedStyle={styles.selectedStyle}
                    renderItem={renderItem}
                    dropdownPosition='auto'
                  />
                </View>
              )
            }
          </View>
        </ScrollView>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: `${loading ? "grey" : "blue"}`}]} onPress={() => {
            addMember({
              saintName: saintName,
              fullname: fullname,
              dateOfBirth: date,
              idCapKhan: capKhan,
              idChucVuXuDoan: chucVuselected,
              idXuDoan: currentUser.idXuDoan,
            })
          }}>
            {
              loading
              ?
              <ActivityIndicator />
              :
              <Text style={styles.buttonText}>Hoàn Thành</Text>
            }
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  modal: {
    backgroundColor: 'white',
    margin: 40,
    borderRadius: 20,
  },
  content: {
    marginTop: 40,
  },
  input: {
    borderBottomColor: '#aaaaac',
    borderBottomWidth: 1,
    fontSize: 20,
    height: 40
  },
  inputArea: {
    marginHorizontal: 16
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '500'
  },
  optionArea: {
    marginHorizontal: 16,
    marginTop: 20
  },
  capKhan: {
    alignItems: 'center'
  },
  dropdown: {
    width: '100%',
    margin: 16,
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  dob: {
    marginHorizontal: 16,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    width: '70%',
    alignItems: 'center',
    borderRadius: 12
    
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  }
})