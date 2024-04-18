import axios from 'axios';

export async function signIn(type, credentials) {
  try {
    const response = await axios.post('/api/login', credentials);
    
    if (response.data.success) {
      // Autenticación exitosa
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('Invalid credentials');
  }
}