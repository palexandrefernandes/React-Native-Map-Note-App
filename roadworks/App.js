import * as React from 'react';
import { Text, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteList from './src/screens/notes/ListNotes';
import NoteCreator from './src/screens/create_note/NoteCreator';
import Login from './src/screens/login/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthComponent } from './src/authentication/AuthProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [ state, setState ] = React.useState({})

  return (
    <AuthComponent state={setState}>
      <NavigationContainer>
        <Stack.Navigator>
          {!state.isLoggedIn ? (
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            ) : !state.token ? (
              <>
                <Stack.Screen name="NoteList" component={NoteList} />
                <Stack.Screen name="NoteCreator" component={NoteCreator} />
              </>
            ) : (
                <Text>Hey</Text>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthComponent>
    
  );
}

export default App;