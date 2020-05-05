import * as React from 'react';
import { Text, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteList from './src/screens/notes/ListNotes';
import NoteCreator from './src/screens/create_note/NoteCreator';
import Login from './src/screens/login/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch(action.type){
      case 'SIGN_IN': 
        return {
          ...prevState,
          token: action.token,
          isLoggedIn: true
        }
      case 'SIGN_OUT': 
        return {
          ...state,
          isLoggedIn: false,
          token: null
        }
      default:
        return prevState;
    }
  }, {isLoggedIn: false, token: null})

  const authContext = React.useMemo(() => ({
    signIn: (username, password) => {
      if(username && password)
        dispatch({type: 'SIGN_IN', token: 'dummy'});
      else
        dispatch({type: 'SIGN_IN', token: null});
    },
    signOut: () => {
      dispatch({type: 'SIGN_OUT'});
    },
    getToken: () => {
      if(state.isLoggedIn)
        return state.token;
    }
  }), []);


  return (
    <AuthContext.Provider value={authContext}>
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
    </AuthContext.Provider>
  );
}

export default App;