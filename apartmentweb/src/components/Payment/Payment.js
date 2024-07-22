import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { authApi, endpoints } from '../../configs/API';
import { useNavigate, useParams } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar/Navbar';
import CryptoJS from 'crypto-js';
import './Payment.css';

const Payment = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();
  const { billId } = useParams(); // Lấy ID hóa đơn từ URL
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBills = async () => {
    try {
      const api = await authApi();
      const response = await api.get(`${endpoints.payment}/${billId}`);
      setBills([response.data]); // Giả sử trả về một hóa đơn duy nhất
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const fetchToken = async () => {
    try {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  useEffect(() => {
    fetchBills();
    fetchToken();
  }, [billId]);

  const handleMomo = async (item) => {
    try {
      const api = await authApi();
      const partnerCode = "MOMO";
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const requestId = `${partnerCode}${Date.now()}`;
      const orderId = `MM${Date.now()}`;
      const orderInfo = "Thanh toán hóa đơn";
      const redirectUrl = "https://momo.vn/return";
      const ipnUrl = "https://callback.url/notify";
      const amount = item.amount;
      const requestType = "payWithATM";
      const extraData = "";

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);

      const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: "vi"
      };

      console.log('Request Body:', JSON.stringify(requestBody));

      const response = await axios.post('/v2/gateway/api/create', JSON.stringify(requestBody), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Momo payment response:', response.data);
      if (response.data && response.data.payUrl) {
        const payUrl = response.data.payUrl.trim();
        console.log('Trimmed PayUrl:', payUrl);

        window.open(payUrl, '_blank');

        try {
          const updateResponse = await api.patch(endpoints.updateStatus(item.id), {
            payment_status: 'PAID',
          });
          console.log('Payment status updated:', updateResponse.data);

          fetchBills();
        } catch (updateError) {
          console.error('Error updating payment status:', updateError);
        }
      } else {
        console.log('Error: Empty payUrl received');
        window.alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau!');
      }
    } catch (error) {
      console.error('Error during Momo payment request:', error.response?.data || error.message);
      window.alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau!');
    }
  };

  return (
    <>
      <CustomNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container className="payment-container">
        <h1 className="title-list">THANH TOÁN HÓA ĐƠN</h1>
        {bills.map((item) => (
          <div key={item.id} className="bill-item">
            <img src={item.image_url} alt={`${item.first_name} ${item.last_name}`} className="bill-image" />
            <div className="bill-info">
              <div className="bill-type">{item.bill_type}</div>
              <div className="bill-amount">Số tiền: {item.amount} VNĐ</div>
              <div className="bill-status">Tình trạng thanh toán: {item.payment_status}</div>
            </div>
            <Button className="btn btn-primary" variant="primary" onClick={() => handleMomo(item)}>
              Thanh toán qua MOMO
            </Button>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Payment;
