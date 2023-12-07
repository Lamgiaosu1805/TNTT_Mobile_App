import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, View } from 'react-native';
import SignInScreens from './src/screens/SignInScreens';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='SignIn'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreens}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
