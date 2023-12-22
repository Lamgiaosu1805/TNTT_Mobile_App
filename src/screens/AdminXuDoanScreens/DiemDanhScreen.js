import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector } from 'react-redux';
import axios from 'axios';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DiemDanhScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const memberXuDoan = useSelector(state => state.memberXuDoan);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
    }, []);
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setLoading(true);
        try {
            const currentUser = await AsyncStorage.getItem('currentUser');
            const token = JSON.parse(currentUser).token;
            const member = memberXuDoan.find((e) => e._id === data);
            if(member) {
                const data = await axios.post(`${utils.apiUrl}/xudoan/member/diemdanh`, {
                    date: new Date(),
                    member: member
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(data.data.code == 304) {
                    alert("Thành viên này hôm nay đã điểm danh")
                }
                else{
                    alert("Điểm danh thành công !")
                }
            }
            else {
                alert("Thành viên này không thuộc xứ đoàn");
                setScanned(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Điểm danh lỗi, vui lòng kiểm tra internet !");
            setLoading(false)
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{width: 200, height: 200}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {loading && <ActivityIndicator />}
            </View>
            {(scanned && !loading) ? <Button title={'Tiếp tục'} onPress={() => setScanned(false)} /> : <Text>Đang điểm danh</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})