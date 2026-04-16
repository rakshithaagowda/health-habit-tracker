import { getJSON, setJSON, del } from './storage'

const USERS_KEY = 'hht_users'
const SESSION_KEY = 'hht_session'

const encode = (s) => btoa(unescape(encodeURIComponent(s))) // demo-only

export const getUsers = () => getJSON(USERS_KEY, [])
export const saveUsers = (users) => setJSON(USERS_KEY, users)

export const signup = ({ name, email, password }) => {
  email = email.trim().toLowerCase()
  const users = getUsers()
  if (users.find(u => u.email === email)) throw new Error('Email already registered.')
  users.push({ name: name.trim(), email, password: encode(password) })
  saveUsers(users)
  // auto-login
  setJSON(SESSION_KEY, { email, name })
}

export const login = ({ email, password }) => {
  email = email.trim().toLowerCase()
  const users = getUsers()
  const found = users.find(u => u.email === email && u.password === encode(password))
  if (!found) throw new Error('Invalid credentials.')
  setJSON(SESSION_KEY, { email, name: found.name })
}

export const logout = () => del(SESSION_KEY)

export const currentUser = () => getJSON(SESSION_KEY, null)
export const isAuthed = () => !!currentUser()
