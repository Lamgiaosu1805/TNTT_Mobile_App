import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import utils from '../../utils';
import DrawerHeader from '../../components/DrawerHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoCard from '../../components/InfoCard';

export default function DiemDanhScreen({navigation}) {
    const memberXuDoan = useSelector(state => state.memberXuDoan);
    const doanSinh = useMemo(() => {
        return utils.filterDoanSinh(memberXuDoan)
    }, [memberXuDoan]);
    const [selectedItem, setSelectedItem] = useState([]);
    const handleItemPress = (id) => {
        const isSelected = selectedItem.includes(id);
        if (isSelected) {
            setSelectedItem((prevItems) => prevItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItem((prevItems) => [...prevItems, id]);
        }
    };
    const Item = ({item}) => (
        <InfoCard item={item} isSelected={selectedItem.includes(item._id)} onPress={() => handleItemPress(item._id)}/>
    )
    return (
        <SafeAreaView style={[styles.container, {paddingVertical: Platform.OS=='android' ? 20 : 0}]}>
            <DrawerHeader title={"Điểm danh"} navigation={navigation}/>
            <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 12}}>{selectedItem.length+"/"+doanSinh.length}</Text>
            <FlatList 
               data={doanSinh}
               renderItem={({item}) => <Item item={item}/>}
               key={(item) => item._id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})