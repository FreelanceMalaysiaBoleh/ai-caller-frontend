import { RootState } from '@/redux/store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

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

const useGetToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token;
}

export {
  login,
  useGetToken
}