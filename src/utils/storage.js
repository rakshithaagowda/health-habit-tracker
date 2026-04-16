export const getJSON = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
export const setJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val))
export const del = (key) => localStorage.removeItem(key)
