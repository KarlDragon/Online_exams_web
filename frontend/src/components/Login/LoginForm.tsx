import React from 'react';
import './LoginRegisterStyle.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginRegisterForm: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const validUsernameRegex = /^[a-zA-Z0-9]+$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validUsernameRegex.test(username)) {
      setErrorMessage("Can't create name with a blank");
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
        // Handle successful login (e.g., redirect to a protected page)
        console.log('Login successfully' + data.username + data.password);
        setErrorMessage("Login successful");
      } else {
        setErrorMessage(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error submitting login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className='globalForm'>
          <h1>Login Form</h1>
          <label>
            <input type="text" placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
      
          <label>
            <input type="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <Link to="/register">Register</Link>
          <Link to="/#">Forgot Password</Link>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
};

export default LoginRegisterForm;