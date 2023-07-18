import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { auth_user: action.payload }
    case 'LOGOUT':
      return { auth_user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    auth_user: null
  })

  useEffect(() => {
    const auth_user = JSON.parse(localStorage.getItem('auth_user'))

    if (auth_user) {
      dispatch({ type: 'LOGIN', payload: auth_user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}