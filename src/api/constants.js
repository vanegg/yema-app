const PEDIATRICIANS_API = 'http://127.0.0.1:8000/es-mx'

export const PEDIATRICIANS = `${PEDIATRICIANS_API}/doctors`
export const APPOINTMENTS = `${PEDIATRICIANS_API}/appointments`
export const APPOINTMENTS_BY_EMAIL = (email) => `${PEDIATRICIANS_API}/appointments/?email=${email}`
export const PEDIATRICIAN = (id) => `${PEDIATRICIANS_API}/doctors/${id}`
