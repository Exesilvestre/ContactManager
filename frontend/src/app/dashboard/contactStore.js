const handleFetchErrors = (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };
  
  const getHeaders = () => {
    const token = localStorage.getItem("token"); // Obtén el token JWT del almacenamiento local o de donde lo tengas guardado
    
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
  
    return {
      'Content-Type': 'application/json',
    };
  };
  
  export const addContactAPI = async (contact) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(contact),
      });
  
      const data = await handleFetchErrors(response);
      return data;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };
  
  export const getContactsAPI = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
        headers: getHeaders(),
      });
      const data = await handleFetchErrors(response);
      return data;
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  };
  
  export const updateContactAPI = async (id, updatedContact) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedContact),
      });
  
      const data = await handleFetchErrors(response);
      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };
  
  export const deleteContactAPI = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
  
      const data = await handleFetchErrors(response);
      return data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };