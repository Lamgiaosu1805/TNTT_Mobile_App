import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider, SafeAreaView } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DrawerNavigator from './src/navigator/DrawerNavigator';
import ListMemberScreen from './src/screens/AdminXuDoanScreens/ListMemberScreen';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import UserBottomTabNavigator from './src/navigator/UserBottomTabNavigator';
import XuDoanInfoScreen from './src/screens/AdminXuDoanScreens/XuDoanInfoScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert("Thông báo", "Đã có bản cập nhật mới, vui lòng cập nhật", [
            {
                text: "OK",
                onPress: async () => {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            }
        ])
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  useEffect(() => {
    onFetchUpdateAsync()
  }, [])
  return (
    <Provider store={store}>
      <PaperProvider theme={{...DefaultTheme}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="AdminXuDoanScreen" component={DrawerNavigator}/>
            <Stack.Screen name="ListMember" component={ListMemberScreen}/>
            <Stack.Screen name="UserScreen" component={UserBottomTabNavigator}/>
            <Stack.Screen name="XuDoanInfoScreen" component={XuDoanInfoScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
