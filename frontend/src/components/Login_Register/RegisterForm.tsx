import React, { useState } from 'react';
import './LoginRegisterStyle.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const navigate = useNavigate();

  const validUsernameRegex = /^[a-zA-Z0-9]+$/;
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Reset error messages
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setGeneralError('');

    // Validate inputs
    if (!validEmailRegex.test(email)) {
      setEmailError("Invalid email address. Please enter a valid email.");
      return;
    }

    if (!validUsernameRegex.test(username)) {
      setUsernameError("Username can only contain letters and numbers.");
      return;
    }

    if (!validPasswordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        username,
        password
      });

      const { data } = response;

      if (data.message === 'Register successfully') {
        console.log('Registration successful:', data);
        setGeneralError("Registration successful");
        // Redirect to home page after successful registration
        navigate('/');
      } else {
        setGeneralError(data.message);
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      setGeneralError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <main>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Đăng ký</h1>
          <div className='input-field'>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <label>Email</label>
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className='input-field'>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            <label>Tên đăng nhập</label>
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>  
          <div className='input-field'>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <label>Mật khẩu</label>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          {generalError && <p className="error-message">{generalError}</p>}
          <button type="submit">Đăng ký</button>
          <div className='register-login'>
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;