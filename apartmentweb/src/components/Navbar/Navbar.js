import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PowerIcon from '@mui/icons-material/Power';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css'; 
import { MyUserContext, MyDispatchContext } from '../../configs/Contexts';

const NavbarComponent = ({ searchTerm, setSearchTerm }) => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const handleSearch = () => {
    // Perform search operation here
    console.log('Searching for:', searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    dispatch({ type: 'logout' });
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
            {!user ? (
              <Nav.Link as={Link} to="/login"><PersonIcon /> Đăng nhập </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile"><PersonIcon /> Chào, {user.last_name}</Nav.Link>
                <NavDropdown title=" " id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/feedback">Phản ánh</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/survey">Khảo sát</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/payment">Thanh toán</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
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
