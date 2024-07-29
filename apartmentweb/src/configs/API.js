import axios from 'axios';

const BASE_URL = 'http://192.168.0.108:8000';

export const endpoints = {
  residents: '/api/residents/',
  createNewAccount: '/api/residents/create-new-account/',
  currentUser: '/api/residents/current-user/',
  changePassword: '/api/residents/change-password/',
  changeAvatar: '/api/residents/change-avatar/',
  login: '/o/token/',

  product: '/api/product/',
  addProduct:'/api/cart/add-product/',
  cartSummary: '/api/cart/cart-summary/',
  updateProductQuantity: '/api/cart/update-product-quantity/',
  deleteProduct: (id) => `/api/cart/${id}/delete-product/`,

  bills: '/api/bills/',
  billDetail: (id) => `/api/bills/${id}/`,
  createBill: '/api/bills/create-bill/',
  createBillFromCart: (id) => `/api/bills/create-bill-from-cart/${id}/`,
  updateStatus: (id) => `/api/bills/${id}/`,
  momo: '/payment/',
  payment: '/api/payment/',

  flats: '/api/flats/',

  items: '/api/items/',
  createItem: '/api/items/create-item/',
  updateReceived: (id) => `/api/items/${id}/mark_received/`,

  feedback: '/api/feedback/',
  feedbackDetail: (id) => `/api/feedback/${id}/`,
  updateResolved: (id) => `/api/feedback/${id}/mark_as_resolved/`,

  famembers: '/api/famembers/',

  survey: '/api/survey/',
  surveyID: (id) => `/api/survey/${id}/`,
  createSurvey: '/api/survey/create-survey/',
  surveyresult: '/api/surveyresult/',
  surveyresultID: (id) => `/api/surveyresult/${id}/`,

  statistics: (id) => `/api/statistics/${id}/`,
};

export const setAuthToken = (token) => {
  try {
    localStorage.setItem('access_token', token);
    console.log('Token set successfully:', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found in localStorage');
    } else {
      console.log('Token retrieved successfully:', token);
    }
    return token; 
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

export const authApi = () => {
  try {
    const token = getAuthToken();
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error creating auth API instance:', error);
    throw error;
  }
};

export default axios.create({
  baseURL: BASE_URL,
});
