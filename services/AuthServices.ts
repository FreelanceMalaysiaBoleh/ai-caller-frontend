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

export const requestOTP = async (email: string) => {
  try {
    // Send the POST request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/request-otp`, 
      {
        email: email
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error requesting OTP:', error);
    throw new Error('Failed to request OTP');
  }
};

export const verifyOTP = async (email: string, otp_code: string) => {
  try {
    // Send the POST request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, 
      {
        email: email,
        otp_code: otp_code
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    
    // Extract error message from response if available
    const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || 'Failed to verify OTP';
    throw new Error(errorMessage);
  }
};

export const register = async (values: { name: string, email: string, password: string, mobile_number: string }) => {
  try {
    // Send the POST request
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, 
      {
        name: values.name,
        email: values.email,
        password: values.password,
        mobile_number: values.mobile_number
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    
    // Extract error message from response if available
    const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || 'Failed to register user';
    throw new Error(errorMessage);
  }
};

const useGetToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token;
}

export {
  login,
  useGetToken
}