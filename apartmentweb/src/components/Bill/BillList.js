import React, { useState, useEffect } from 'react';
import { Table, Button, Nav } from 'react-bootstrap';
import { authApi, endpoints } from '../../configs/API';
import CustomNavbar from '../../components/Navbar/Navbar';
import './Bill.css'; // Import CSS file for custom styling

const BillList = () => {
  const api = authApi(); // Initialize authApi instance
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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

  const handleSelectBill = (selectedBill) => {
    console.log('Selected Bill:', selectedBill);
    // Example navigation if using React Router: history.push(`/bill/${selectedBill.id}`);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredBills = bills.filter(bill =>
    bill.bill_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CustomNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="bill-list-container">
        <div className="bill-list-menu">
          <Nav className="flex-column">
            <Nav.Item className="title-list">
              DANH SÁCH HÓA ĐƠN
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleFilterChange('all')}>Tất cả</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleFilterChange('paid')}>Đã thanh toán</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleFilterChange('unpaid')}>Chưa thanh toán</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="bill-list-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Loại hóa đơn</th>
                <th>Ngày phát hành</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map(bill => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.bill_type}</td>
                  <td>{bill.issue_date}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.payment_status}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleSelectBill(bill)}>
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BillList;
