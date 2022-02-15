import React, {createContext, useEffect, useState} from 'react'
import { IAuthProvider, IContext, IUser } from './types'
import { GetUserLocalStorage, LoginRequest, SetUserLocalStorage } from './util'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    useEffect(() => {
      const user = GetUserLocalStorage
      
      if (user) {
          setUser(user)
      }
    }, [])

    async function authenticate (email: string, password: string) {
        const response = await LoginRequest(email, password)
        
        const payload = {token: response.token, email}

        setUser(payload)
        SetUserLocalStorage(payload)
    }

    function logout () {
        setUser(null)
        SetUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )

}