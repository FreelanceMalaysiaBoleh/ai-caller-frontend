import axios from 'axios';
import Cookies from 'js-cookie';

const login = async (values: { username: string, password: string }) => {
  const { username, password } = values;

  try {

    // Create the form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Send the POST request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.access_token
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Failed to login');
  }
}

/**
 * Save token as a cookie
 * @param token - The token to save
 * @param expirationDays - Number of days the cookie should persist (default is 7 days)
 */
const saveToken = (token: string, expirationDays: number = 7): void => {
  Cookies.set('authToken', token, { expires: expirationDays, secure: true });
};

/**
 * Save token as a cookie
 * @param token - The token to save
 * @param expirationDays - Number of days the cookie should persist (default is 7 days)
 */
const saveUserID = (uid: string, expirationDays: number = 7): void => {
  Cookies.set('userID', uid, { expires: expirationDays, secure: true });
};


/**
 * Get the token from the cookie
 * @returns {string | undefined} - The saved token, or undefined if it doesn't exist
 */
const getToken = (): string | undefined => {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("Token not found");
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token from cookies:", error);
    return undefined;
  }
};

const deleteToken = (): void => {
  try {
    Cookies.remove("authToken");
  } catch (error) {
    console.error("Error deleting token from cookies:", error);
  }
};

export {
  login,
  saveToken,
  getToken,
  deleteToken
}