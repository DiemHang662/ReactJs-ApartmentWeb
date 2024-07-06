import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Tab, Tabs } from 'react-bootstrap';
import CustomNavbar from '../../components/Navbar/Navbar';
import { authApi, endpoints } from '../../configs/API';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './BillList.css';

const BillList = () => {
  const api = authApi();
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const params = filter === 'all' ? {} : { payment_status: filter.toUpperCase() };
        const response = await api.get(endpoints.bills, { params });
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error.response?.data || error.message);
      }
    };

    fetchBills();
  }, [filter, api]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredBills = bills.filter(bill =>
    bill.bill_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CustomNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 className="title-list">DANH SÁCH HÓA ĐƠN</h1>
      <div className="container">
        <Tabs
          id="filter-tabs"
          activeKey={filter}
          onSelect={(value) => handleFilterChange(value)}
          className="flex"
        >
          <Tab eventKey="all" title="Tất cả" className="nav-link" />
          <Tab eventKey="paid" title="Đã thanh toán" className="nav-link" />
          <Tab eventKey="unpaid" title="Chưa thanh toán" className="nav-link" />
        </Tabs>
      </div>

      <div className="bill-list-cards">
        <Row>
          {filteredBills.map(bill => (
            <Col key={bill.id} xs={12} sm={6} md={4} lg={4} style={{ marginBottom: '20px' }}>
              <Card>
                <Card.Body>
                  <div className="avatar-container">
                    <img src={bill.avatar} alt={`${bill.first_name} ${bill.last_name}`} className="avatar-img"/>
                  </div>
                  <Card.Title>{bill.bill_type}</Card.Title>
                  <Card.Text>
                    Số tiền: {bill.amount} VNĐ <br />
                    Tình trạng thanh toán: {bill.payment_status}
                  </Card.Text>
                  <Button onClick={() => navigate(`/bill/${bill.id}`)}>
                    <KeyboardDoubleArrowRightIcon/>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default BillList;
