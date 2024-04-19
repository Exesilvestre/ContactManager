import axios from 'axios';

export async function createSession(userId) {
  try {
    const response = await axios.post('http://localhost:4000/api/session', {
      userId: userId
    });

    if (response.data.success) {
      return response.data.sessionId;
    } else {
      throw new Error('Failed to create session');
    }
  } catch (error) {
    throw new Error('Failed to create session');
  }
}
