import * as React from 'react';
import {YellowBox} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login/Login';
import { AuthComponent } from './src/authentication/AuthProvider';
import NotesRoute from './src/routes/NotesRoute';
import MainRoute from './src/routes/MainRoute';
import {TranslationProvider} from './src/translation/TranslationProvider';

const Stack = createStackNavigator()

function App() {
  console.disableYellowBox = true;
  const [ state, setState ] = React.useState({})

  return (
    <TranslationProvider>
      <AuthComponent state={setState}>
        <NavigationContainer>
          <Stack.Navigator>
            {!state.isLoggedIn ? (
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
              ) : !state.token ? (
                <Stack.Screen name="NotesRoute" component={NotesRoute} options={{headerShown: false}}/>
              ) : (
                <Stack.Screen name="MainRoute" component={MainRoute} options={{headerShown: false}}/>
              )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthComponent>
    </TranslationProvider>
    
  );
}

export default App;