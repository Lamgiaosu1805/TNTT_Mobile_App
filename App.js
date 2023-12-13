import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
    
  );
}
