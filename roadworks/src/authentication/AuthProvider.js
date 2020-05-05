import * as React from 'react';

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
          default:
            props.state(prevState);
            return prevState;
        }
      }, {isLoggedIn: false, token: null})
    
      const authContext = React.useMemo(() => ({
        signIn: (username, password) => {
            console.log('Sign In')
          if(username && password)
            dispatch({type: 'SIGN_IN', token: 'dummy'});
          else
            dispatch({type: 'SIGN_IN', token: null});
        },
        signOut: () => {
          dispatch({type: 'SIGN_OUT'});
        },
        getState: () => {
            return state;
        }
      }), []);

      return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
      )    
}


