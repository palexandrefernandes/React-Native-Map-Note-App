import * as React from 'react';

export const AuthContext = React.createContext();
export let currentState = {isLoggedIn: false, token: null};

export function AuthComponent(props){
    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type){
          case 'SIGN_IN': 
            currentState = {
              ...prevState,
              token: action.token,
              isLoggedIn: true
            };
            return currentState;
          case 'SIGN_OUT': 
            currentState = {
              ...prevstate,
              isLoggedIn: false,
              token: null
            };
            return currentState;
          default:
            return prevState;
        }
      }, {isLoggedIn: false, token: null})
    
      const authContext = React.useMemo(() => ({
        signIn: (username, password) => {
            console.log('Sign In');
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
            {props.children}
        </AuthContext.Provider>
      )    
}


