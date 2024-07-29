import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import API, { setAuthToken, endpoints } from '../../configs/API';
import { MyDispatchContext } from '../../configs/Contexts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { auth, signInWithPopup, googleProvider, facebookProvider } from '../../Firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userType, setUserType] = useState('regular');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useContext(MyDispatchContext);

  const login = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('client_id', 'Oyl13CtUf1P9FE39omeIFcArmR95erKvk151Jhpl');
      formData.append('client_secret', 'vxPObcUCtPZ25ZxHzujWQew34clKvPioOxLJuBYY8VYKBqFreHYjOxV1lamby4SIMwYJzjIWXWeKBTd9CCLKeg8ubbBfY4p99iqHkQPHnOpbWkuhwyer9hYFjDH64x9n');
      formData.append('grant_type', 'password');

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const res = await API.post(endpoints.login, formData, config);

      const token = res.data.access_token;
      console.log('Login successful, token:', token);
      setAuthToken(token);

      let user = await API.get(endpoints.currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.info(user.data);

      dispatch({
        type: 'login',
        payload: user.data,
      });

      if (user.data.is_superuser !== (userType === 'superuser')) {
        setError('Đăng nhập không thành công');
        return;
      }

      navigate('/');
    } catch (ex) {
      console.error('Login error', ex);
      setError('Vui lòng nhập lại username hoặc password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      localStorage.setItem("email", user.email);
  
      // Dispatch the user data to the context
      dispatch({
        type: 'login',
        payload: userData,
      });
  
      // Navigate to the home page or any other desired page
      navigate('/profile');
    } catch (error) {
      console.error('Google Sign-In error', error);
      setError('Đăng nhập bằng Google không thành công');
    }
  };
  

  // Uncomment and implement Facebook Sign-In if needed
  // const handleFacebookSignIn = async () => {
  //   try {
  //     await auth.signOut(); // Ensure sign-out completes
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     const user = result.user;
  //     localStorage.setItem("email", user.email);
  //     dispatch({
  //       type: 'login',
  //       payload: {
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //         uid: user.uid,
  //       },
  //     });
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Facebook Sign-In error', error);
  //     setError('Đăng nhập bằng Facebook không thành công');
  //   }
  // };

  return (
    <div className="background">
      <div className="container-login">
        <h1 className="title">ĐĂNG NHẬP</h1>
        <Form>
          <Form.Group controlId="formBasicUserType">
            <Form.Select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className={`input ${isFocused ? 'focused' : ''}`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <option value="regular">Cư dân</option>
              <option value="superuser">Quản trị viên</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="position-relative">
            <Form.Control
              type={secureTextEntry ? 'password' : 'text'}
              placeholder="Mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <Button
              variant="link"
              className="password-toggle"
              onClick={() => setSecureTextEntry(!secureTextEntry)}
            >
              {secureTextEntry ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Button>
          </Form.Group>
          {error && (
            <Alert variant="danger" style={{ width: '95%', margin: '10px 20px', height: '60px' }}>
              {error}
            </Alert>
          )}
          <Button variant="success" onClick={login} className="loginBtn">
            ĐĂNG NHẬP
          </Button>
          <div className="social-buttons">
            <Button variant="danger" className="google" onClick={handleGoogleSignIn}>
              <GoogleIcon /> Đăng nhập Google
            </Button>
            {/* Uncomment if Facebook sign-in is implemented
            <Button variant="primary" className="facebook" onClick={handleFacebookSignIn}>
              <FacebookIcon /> Đăng nhập Facebook
            </Button>
            */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
