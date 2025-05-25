// Define interfaces for User and Error objects
export interface User { // Added export
  id: string;
  fullname: string;
  email: string;
  phone: string;
  // Add any other user properties returned by the API
}

export interface AuthError { // Added export
  error: boolean;
  message: string;
  details?: any; // For more detailed error info from API
}

const API_BASE_URL = 'https://kickstart-59ea.onrender.com/api/users';

// Helper function to handle localStorage access safely
const getItemFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Failed to read from localStorage:', e);
    return null;
  }
};

const setItemInLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error('Failed to write to localStorage:', e);
  }
};

const removeItemFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove from localStorage:', e);
  }
};

export const loginUser = async (email, password): Promise<User | AuthError> => {
  const url = `${API_BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  try {
    const response = await fetch(url, {
      method: 'POST', // As per user confirmation
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message || 'Login failed', details: data };
    }

    if (data.token && data.user) {
      setItemInLocalStorage('authToken', data.token);
      setItemInLocalStorage('currentUser', JSON.stringify(data.user));
      return data.user as User;
    } else {
      return { error: true, message: 'Login response did not include token or user.' };
    }
  } catch (error) {
    console.error('Login API call failed:', error);
    return { error: true, message: error instanceof Error ? error.message : 'An unexpected error occurred during login.' };
  }
};

export const signupUser = async (userData: { fullname, email, phone, password }): Promise<User | AuthError> => {
  const url = `${API_BASE_URL}/signup`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message || 'Signup failed', details: data };
    }

    if (data.token && data.user) {
      setItemInLocalStorage('authToken', data.token);
      setItemInLocalStorage('currentUser', JSON.stringify(data.user));
      return data.user as User;
    } else {
      return { error: true, message: 'Signup response did not include token or user.' };
    }
  } catch (error) {
    console.error('Signup API call failed:', error);
    return { error: true, message: error instanceof Error ? error.message : 'An unexpected error occurred during signup.' };
  }
};

export const logoutUser = (): void => {
  removeItemFromLocalStorage('authToken');
  removeItemFromLocalStorage('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userStr = getItemFromLocalStorage('currentUser');
  if (userStr) {
    try {
      return JSON.parse(userStr) as User;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      removeItemFromLocalStorage('currentUser'); // Clear corrupted data
      return null;
    }
  }
  return null;
};

export const getToken = (): string | null => {
  return getItemFromLocalStorage('authToken');
};
