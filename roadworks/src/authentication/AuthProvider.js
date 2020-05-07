import * as React from 'react';
import { AsyncStorage } from 'react-native';
import Auth from './auth';

export const AuthContext = React.createContext();

export function AuthComponent(props){
    const [state, dispatch] = React.useReducer((prevState, action) => {
        let cState = {};
        switch(action.type){
          case 'SIGN_IN': 
            cState = {
              ...prevState,
              token: action.token,
              isLoggedIn: true
            };
            props.state(cState);
            return state;
          case 'SIGN_OUT': 
            cState = {
              ...prevState,
              isLoggedIn: false,
              token: null
            };
            props.state(cState);
            return state;
          
        }
      }, {isLoggedIn: false, token: null});
    
      const authContext = React.useMemo(() => ({
        signIn: async (username, password) => {
            console.log('Sign In')
          if(username && password) {
            const data = await Auth(username, password);
            if(data) {
              await AsyncStorage.setItem('token', data);
              dispatch({type: 'SIGN_IN', token: data});
            }
            else{
              alert('Credentials do not match!');
            }
           }
        },
        skipLogin : () => {
          dispatch({type: 'SIGN_IN', token:null});
        },
        signOut: async () => {
          await AsyncStorage.removeItem('token');
          dispatch({type: 'SIGN_OUT'});
        },
        getToken: async () => {
          return await AsyncStorage.getItem('token');
        }
      }), []);

      return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
      )    
}


