import React, { useState } from 'react';
import './LoginRegisterStyle.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validUsernameRegex = /^[a-zA-Z0-9]+$/;
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validUsernameRegex.test(username)) {
      setErrorMessage("Username can only contain letters and numbers.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      const data = response.data;

      if (data.message === 'Login successfully!') {
        console.log('Login successful:', data.username);
        setErrorMessage("Login successful");
        navigate('/');
        // Handle successful login (e.g., redirect to a protected page)
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error submitting login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <main>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Đăng nhập</h1>
          <div className='input-field'>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            <label>Tên đăng nhập</label>
          </div>
          <div className='input-field'>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <label>Mật khẩu</label>
          </div>
          <div className="forget">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Ghi nhớ tôi</span>
            </label>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Đăng nhập</button>
          <div className="register-login">
            <p>Không có tài khoản? <Link to="/register">Đăng ký</Link></p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;