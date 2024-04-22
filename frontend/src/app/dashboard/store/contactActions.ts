import { getSession } from "next-auth/react";

const handleFetchErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
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
    const headers = await getHeaders();  // Espera a que getHeaders se resuelva
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
      method: 'POST',
      headers: headers,
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
    const headers = await getHeaders();  // Espera a que getHeaders se resuelva
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
      headers: headers,
    });
    const data = await handleFetchErrors(response);
    return data;
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
};