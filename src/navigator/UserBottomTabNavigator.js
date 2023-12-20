import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/UserScreens/HomeScreen';
import UserScreen from '../screens/UserScreens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function UserBottomTabNavigator() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                paddingHorizontal: 16
            }
        }}
    >
        <Tab.Screen 
            name="UserHome"
            component={HomeScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name='home' size={20} color={focused ? 'red' : 'black'}/>
                        <Text style={{fontSize: 12, color: focused ? 'red' : 'black'}}>Trang chủ</Text>
                    </View>
                )
            }}
        />
        <Tab.Screen 
            name="UserProfile"
            component={UserScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name="person-circle-outline" size={20} color={focused ? 'red' : 'black'}/>
                        <Text style={{fontSize: 12, color: focused ? 'red' : 'black'}}>Trang cá nhân</Text>
                    </View>
                )
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})