import * as React from 'react';
import Auth from './auth';

export const AuthContext = React.createContext();

export function AuthComponent(props){
    console.log('heys');

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
        signIn: (username, password) => {
            console.log('Sign In')
          if(username && password) {
            Auth(username, password)
              .then(res => {
                if(res){
                  console.info(res);
                  dispatch({type: 'SIGN_IN', token: res});
                }
                else
                  alert('The credentials dont match!');
              })
              .catch(err => {
                console.log("Server is probably down!");
              });
           }
        },
        skipLogin : () => {
          dispatch({type: 'SIGN_IN', token:null});
        },
        signOut: () => {
          dispatch({type: 'SIGN_OUT'});
        },
        getState: () => {
          return state;
        },
        getToken: () => {
          return state.token;
        }
      }), []);

      return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
      )    
}


