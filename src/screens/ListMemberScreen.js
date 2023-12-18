import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import utils from '../utils'

export default function ListMemberScreen() {
    const listMember = useSelector(state => state.memberXuDoan);
    const listCapKhan = useSelector(state => state.capKhan);
    const listChucVu = useSelector(state => state.chucVu);

    const renderCapKhan = (id) => {
        const capKhan = listCapKhan.find((e) => e._id == id);
        return capKhan.name
    }

    const renderChucVu = (listIdChucVu) => {
        const chucVu = listIdChucVu.map((id) => listChucVu.find((e) => e._id == id).name);
        var listRender = ""
        chucVu.forEach(element => {
            listRender += `${element}, `
        });
        return listRender;
    }

    const Item = ({item}) => (
        <View style={styles.item} key={item._id}>
            <Text>{`${item.saintName} ${item.fullname}`}</Text>
            <Text>{`Ngày sinh: ${utils.formatDate(item.dateOfBirth)}`}</Text>
            <Text>{`Cấp: ${renderCapKhan(item.idCapKhan)}`}</Text>
            <Text>{`Chức vụ: ${renderChucVu(item.idChucVuXuDoan)}`}</Text>
        </View>
    )
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList 
                data={listMember}
                renderItem={({item}) => <Item item={item}/>}
                key={(item) => item._id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        margin: 20
    }
})