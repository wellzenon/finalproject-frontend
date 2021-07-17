import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const types = {
  ID: "ID",
  NAME: "NAME",
  PICTURE: "PICTURE",
  IS_AUTHENTICATED: "IS_AUTHENTICATED"
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.ID:
      return {...state, id: action.value}
    case types.NAME:
      return {...state, name: action.value}
    case types.PICTURE:
      return {...state, picture: action.value}
    case types.IS_AUTHENTICATED:
      return {...state, isAuthenticated: action.value}
  }
}

const initialState = {
  id:"",
  name: "",
  picture: "",
  isAuthenticated: false
}

export function UserWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState) 

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
