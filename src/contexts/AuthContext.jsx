import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const login = (username, password) =>
    signInWithEmailAndPassword(auth, `${username.trim().toLowerCase()}@oud.com`, password)
  const logout = () => signOut(auth)
  const changePassword = (newPassword) => updatePassword(user, newPassword)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, changePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
