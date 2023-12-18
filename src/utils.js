import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const devApi = "http://192.168.1.182:3000/api/v1";
const productApi = "https://tgp-hn-api.vercel.app/api/v1";
class Utils {
    apiUrl = productApi;
    
    logout(navigation) {
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

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-GB'); 
    }
}

module.exports = new Utils