import React, { useState, FormEvent } from 'react';
import styles from './Login.module.scss';
import { TextInput } from '../../components/TextInput';
import { NetworkService } from '../../services/NetworkService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import GoogleSignupButton from '../../components/GoogleSignUpButton';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if(isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setIsSubmitting(true);

      const response = await NetworkService.loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.info('API Response:', response);

      // Check for response
      if (!response) {
        setError('Login failed. No response from server.');
        return;
      }

      setSuccess(true);

      // Just for debugging, log what we get
      if (response.user.firstName) {
        console.info('User data found at root level:', {
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
        });
      }

      if (response.user) {
        console.info('User data found in user property:', response.user);
      }

      // Create a new object with only the properties we need
      // This prevents any type issues by creating a fresh, simple object
      const userData = {
        firstName: String(response.user.firstName || (response.user && response.user.firstName) || ''),
        lastName: String(response.user.lastName || (response.user && response.user.lastName) || ''),
        email: String(response.user.email || (response.user && response.user.email) || ''),
      };

      console.info('User data being dispatched to Redux:', userData);

      // Dispatch this simple object to Redux
      dispatch(setUser(userData));

      navigate('/dashboard');

      setFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      console.error('Login error:', err);
      setError((err as Error).message || 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

   const handleGoogleLogin = () => {
      NetworkService.initiateGoogleLogin();
    };

  return (
    <div className={styles.body}>
      <div className={styles.authForm}>
        <div className={styles.headers}>
          <h1 className={styles.authHeader}>Border Buddy</h1>
          <p className={styles.secondHeader}>
            Don't have an account? <a href="/signup">Sign up here!</a>
          </p>
        </div>

        <div className={styles.socialLogin}>
          <button type="button" onClick={handleGoogleLogin} className={styles.googleButton}>
            <GoogleSignupButton />
            Log in with Google
          </button>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
        </div>

        {success && !error && <div className={styles.successMessage}>Login successful!</div>}

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required={true}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={true}
          />

          <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
