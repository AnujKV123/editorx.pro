import { createContext, useContext } from "react"

export const UserContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    refreshToken: null,
    setRefreshToken: () => {},
    logout: () => {},

})

export const UserProvider = UserContext.Provider

export default function User() {
    return useContext(UserProvider)
}

