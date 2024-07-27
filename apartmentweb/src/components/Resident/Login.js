import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import API, { setAuthToken, endpoints } from '../../configs/API';
import { MyDispatchContext } from '../../configs/Contexts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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

          {error && <Alert variant="danger" style={{ width: '90%', margin: '5px 20px' , height:'55px'}}>{error}</Alert>}
         
          <Button variant="success" onClick={login} className="loginBtn">
            ĐĂNG NHẬP
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default Login;
