// Updated NetworkService.ts
const BASE_URL = 'http://localhost:5001/api';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  // Add credentials: 'include' as default for all requests
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important for session-based auth
    ...options,
  });

  // Check if the response is JSON
  const contentType = response.headers.get('content-type');
  let data: any;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : data.message || 'Something went wrong');
  }

  return data;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

// Define what your API returns for login
interface LoginResponse {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    // Add other user properties that come back
  };
  token?: string;
}

interface NetworkServiceType {
  signupUser: (userData: UserData) => Promise<any>;
  loginUser: (credentials: Credentials) => Promise<LoginResponse>;
  getCurrentUser: () => Promise<LoginResponse>;
  logoutUser: () => Promise<void>;
  initiateGoogleLogin: () => void;
}

export const NetworkService: NetworkServiceType = {
  signupUser: userData =>
    request('/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  loginUser: credentials =>
    request<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getCurrentUser: () =>
    request<LoginResponse>('/users/getCurrent', {
      method: 'GET',
    }),

  logoutUser: () =>
    request('/users/logout', {
      method: 'POST',
    }),

  initiateGoogleLogin: () => {
    // This is a window redirect, not an API call
    // We need to redirect to the Google Auth URL
    const FRONTEND_URL = 'http://localhost:3000';
    const googleAuthUrl = `${BASE_URL}/users/auth/google`;

    // Store the redirect URL in localStorage so backend knows where to redirect after auth
    localStorage.setItem('redirectAfterAuth', `${FRONTEND_URL}/dashboard`);

    // Redirect to Google Auth
    window.location.href = googleAuthUrl;
  },
};
