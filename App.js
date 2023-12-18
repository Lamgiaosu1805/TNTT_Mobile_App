import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider, SafeAreaView } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DrawerNavigator from './src/navigator/DrawerNavigator';
import ListMemberScreen from './src/screens/ListMemberScreen';

const Stack = createNativeStackNavigator();


export default function App() {
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
            <Stack.Screen name="HomeDrawer" component={DrawerNavigator}/>
            <Stack.Screen name="ListMember" component={ListMemberScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
