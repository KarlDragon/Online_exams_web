import React from 'react';
import './LoginRegisterStyle.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginRegisterForm: React.FC = () => {
const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const validUsernameRegex = /^[a-zA-Z0-9]+$/;
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validEmailRegex.test(email)) {
      setEmailErrorMessage("Invalid email address. Please enter a valid email.");
      return;
    }

    if (!validUsernameRegex.test(username)) {
      setUsernameErrorMessage("Invalid username. Username can only contain letters and numbers.");
      return;
    }

    if (!validPasswordRegex.test(password)) {
      setPasswordErrorMessage("Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    
    setEmailErrorMessage("");
    setUsernameErrorMessage("");
    setPasswordErrorMessage("");

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        username,
        password
      });

      const data = response.data;

      if (data.message === 'Register successfully') {
        // Handle successful login (e.g., redirect to a protected page)
        console.log('Register successful' + data.email + data.username + data.password);
        setErrorMessage("Register successful");
      } else {
        setErrorMessage(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error submitting register:', error);
      setErrorMessage('An error occurred during register. Please try again.');
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className='globalForm'>
          <h1>Register Form</h1>
          <label>
            <input type="text" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
            {emailErrorMessage && <p className="error-message">{emailErrorMessage}</p>}
          </label>

          <label>
            <input type="text" placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)} />
            {usernameErrorMessage && <p className="error-message">{usernameErrorMessage}</p>}
          </label>
      
          <label>
            <input type="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
            {passwordErrorMessage && <p className="error-message">{passwordErrorMessage}</p>}
          </label>

          <Link to="/login">Login</Link>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Register</button>
        </div>
      </form>
    </main>
  );
};

export default LoginRegisterForm;