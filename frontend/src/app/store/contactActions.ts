import { getSession } from "next-auth/react";
import config from '../../config/config'

const handleFetchErrors = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      throw new Error('Failed to parse JSON response');
    }
  } else {
    return await response.text();
  }
};


const getHeaders = async (): Promise<HeadersInit> => {
  const session = await getSession();  
  if (session?.user?.token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.user.token}`,
    };
  }

  return {
    'Content-Type': 'application/json',
  };
};

export const addContactAPI = async (contact: any) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${config.backendUrl}/contacts`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(contact),
    });
    console.log(contact)
    const data = await handleFetchErrors(response);
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const getContactsAPI = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${config.backendUrl}/contacts`, {
      headers: headers,
    });
    const data = await handleFetchErrors(response);
    return data;
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
};

export const getContactByIdAPI = async (contactId: any) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${config.backendUrl}/contacts/${contactId}`, {
      headers: headers,
    });
    const data = await handleFetchErrors(response);
    return data;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw error;
  }
};

export const deleteContactAPI = async (contactId: any) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${config.backendUrl}/contacts/${contactId}`, {
      method: 'DELETE',
      headers: headers,
    });
    const data = await handleFetchErrors(response);
    return data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};