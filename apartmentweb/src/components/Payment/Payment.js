import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { authApi, endpoints } from '../../configs/API';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Payment.css';

const Payment = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const fetchBills = async () => {
    try {
      const api = await authApi();
      const response = await api.get(endpoints.payment);
      setBills(response.data);
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
  }, []);

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

      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', JSON.stringify(requestBody), {
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
    <Container className="payment-container">
      {bills.map((item) => (
        <Card className="bill-card" key={item.id}>
          <Card.Body>
            <Card.Text>
              <strong>Loại hóa đơn:</strong> {item.bill_type}
            </Card.Text>
            <Card.Text>
              <strong>Số tiền thanh toán:</strong> {item.amount} VND
            </Card.Text>
            <Card.Text>
              <strong>Ngày phát hành:</strong> {item.issue_date}
            </Card.Text>
            <Card.Text>
              <strong>Ngày hết hạn:</strong> {item.due_date}
            </Card.Text>
            <div className="button-container">
              <Button variant="primary" onClick={() => handleMomo(item)}>
                Thanh toán qua MOMO
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Payment;
