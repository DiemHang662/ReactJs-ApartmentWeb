import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PowerIcon from '@mui/icons-material/Power';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css'; // Import your CSS file for specific styles

const NavbarComponent = ({ searchTerm, setSearchTerm }) => {

  const handleSearch = () => {
    // Perform search operation here
    console.log('Searching for:', searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="https://img5.thuthuatphanmem.vn/uploads/2022/01/13/logo-nha-ngoi_075713022.jpg" alt="Golden Sea logo" />
          GOLDEN SEA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><HomeIcon /> Trang chủ </Nav.Link>
            <Nav.Link as={Link} to="/bill"><ReceiptIcon /> Hóa đơn </Nav.Link>
            <Nav.Link as={Link} to="/item"><PowerIcon /> Tủ đồ điện </Nav.Link>
            <Nav.Link as={Link} to="/payment"><PaymentIcon /> Thanh toán </Nav.Link>
            <NavDropdown title=" " id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Hồ sơ cá nhân</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/feedback">Phản ánh</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/survey">Khảo sát</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="mr-1 searchInput"
              aria-label="Search"
            />
            <Button variant="outline-success" className="searchButton" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
