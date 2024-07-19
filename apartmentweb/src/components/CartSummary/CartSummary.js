import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, FormControl } from 'react-bootstrap';
import { authApi, endpoints } from '../../configs/API';
import CustomNavbar from '../../components/Navbar/Navbar';
import './CartSummary.css';

const CartSummary = () => {
  const api = authApi();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(endpoints.cartSummary);
        const cartProducts = response.data.cart_products || []; // Đảm bảo rằng luôn là mảng
        const totalPrice = response.data.total_price || 0; // Đảm bảo rằng luôn là số
        setCartItems(cartProducts);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error('Error fetching cart items:', error.response?.data || error.message);
      }
    };

    fetchCartItems();
  }, [api]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.post(endpoints.updateProductQuantity, {
        product_id: productId,
        quantity
      });
      const cartProducts = response.data.cart_products || [];
      const totalPrice = response.data.total_price || 0;
      setCartItems(cartProducts);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error updating item quantity:', error.response?.data || error.message);
      alert('Lỗi khi cập nhật số lượng sản phẩm');
    }
  };

  const deleteFromCart = async (cartProductId) => {
    try {
      await api.delete(endpoints.deleteProduct(cartProductId));
      const newCartItems = cartItems.filter(item => item.id !== cartProductId);
      const newTotalPrice = newCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setCartItems(newCartItems);
      setTotalPrice(newTotalPrice);
      setAlertMessage('Xóa sản phẩm thành công');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error deleting item from cart:', error.response?.data || error.message);
      alert('Lỗi khi xóa sản phẩm khỏi giỏ hàng');
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="content">
        <div className="cart-summary">
          <h2 className="text-primary">GIỎ HÀNG CỦA BẠN</h2>

          {showAlert && (
            <Alert variant="success" style={{ width: '100%', margin: '10px' }}>
              {alertMessage}
            </Alert>
          )}

          <Table hover className="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.product.image_url} alt={item.product.name} className="image" /></td>
                  <td className="name">{item.product.name}</td>
                  <td className="quantity">
                    <FormControl
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td className="price">{item.product.price * item.quantity} VNĐ</td>
                  <td >
                    <div className="bt">
                      <Button variant="success" onClick={() => deleteFromCart(item.id)}>Mua ngay</Button>
                      <Button variant="danger" onClick={() => deleteFromCart(item.id)}>X</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="total-price">
            <h3>Tổng giá: {totalPrice} VNĐ</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
