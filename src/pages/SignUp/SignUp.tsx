import React, { useState, useEffect, FormEvent } from 'react';
import styles from './SignUp.module.scss';
import { TextInput } from '../../components/TextInput';
import { NetworkService } from '../../services/NetworkService';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { setUser, checkAuth } from '../../store/authSlice';
import GoogleSignupButton from '../../components/GoogleSignUpButton';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

const SignUpForm = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch(); 
  useEffect(() => {

    dispatch(checkAuth());
  }, [dispatch]);

  console.info('Is authenticated:', isAuthenticated);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('an uppercase letter');
    if (!/\d/.test(password)) errors.push('a number');
    return errors;
  };

  const passwordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  // Google login handler
  const handleGoogleLogin = () => {
    NetworkService.initiateGoogleLogin();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await NetworkService.signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.info('Signup response:', response);

      if (!response) {
        throw new Error('Something went wrong');
      }

      // Check if the response is an array or has a user property
      const userData = response.user || response;

      // Create a consistent user object from the response
      const normalizedUser = {
        firstName: userData.first_name || userData.firstName || '',
        lastName: userData.last_name || userData.lastName || '',
        email: userData.email || '',
        id: userData.id || '',
      };

      setSuccess(true);

      // Clear the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Dispatch user data to Redux
      dispatch(setUser(normalizedUser));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.authForm}>
        <div className={styles.headers}>
          <h1 className={styles.authHeader}>Border Buddy</h1>
          <p className={styles.secondHeader}>
            Having trouble keeping track of what visa you need for which countries? Need to keep
            track of how long your trip is so you don't overstay your visa? Sign up for free!
          </p>
        </div>

        <div className={styles.socialLogin}>
          <button type="button" onClick={handleGoogleLogin} className={styles.googleButton}>
            <GoogleSignupButton />
            Sign up with Google
          </button>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
        </div>

        {success && (
          <div className={styles.successMessage}>
            Registration successful! Please check your email.
          </div>
        )}

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.names}>
            <div className={styles.nameField}>
              <TextInput
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className={styles.nameField}>
              <TextInput
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required={true}
              />
            </div>
          </div>
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
          {formData.password && (
            <div className={styles.passwordFeedback}>
              {validatePassword(formData.password).length === 0 ? (
                <span className={styles.valid}>✅ Password looks good!</span>
              ) : (
                <ul className={styles.errorList}>
                  {validatePassword(formData.password).map((msg, idx) => (
                    <li key={idx}>❌ Needs {msg}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required={true}
          />
          {formData.confirmPassword && (
            <div className={styles.passwordFeedback}>
              {passwordsMatch(formData.password, formData.confirmPassword) ? (
                <span className={styles.valid}>✅ Passwords match</span>
              ) : (
                <span className={styles.error}>❌ Passwords do not match</span>
              )}
            </div>
          )}
          <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className={styles.bottomText}>
          Have an account? <a href="/login">Log in here</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
