import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { authApi, endpoints } from '../../configs/API';
import CustomNavbar from '../../components/Navbar/Navbar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './ProductList.css'; // Import your CSS file for styling

const ProductList = () => {
  const api = authApi();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(endpoints.product);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [api]);

  return (
    <>
    <CustomNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <div className="content">
        <div className="cart"><AddShoppingCartIcon/></div>
    <div className="product-list">
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={8} md={4} lg={3} className="product-card-col">
            <Card className="product-card">
              <Card.Img variant="top" src={product.image_url} className="product-image" />
              <Card.Body>
                <Card.Title className="product-name">{product.name}</Card.Title>
                <Card.Text className="product-price">Giá: {product.price} VNĐ</Card.Text>
                <Button variant="danger" className="add-to-cart-btn">
                  <AddShoppingCartIcon/> Thêm vào giỏ
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </div>
    </>
  );
};

export default ProductList;
