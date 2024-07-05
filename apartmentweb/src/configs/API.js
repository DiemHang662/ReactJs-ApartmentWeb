import axios from 'axios';

const BASE_URL = 'http://192.168.1.7:8000/';

export const endpoints = {
  residents: '/api/residents/',
  createNewAccount: '/api/residents/create-new-account/',
  currentUser: '/api/residents/current-user/',
  changePassword: '/api/residents/change-password/',
  changeAvatar: '/api/residents/change-avatar/',
  bills: '/api/bills/',
  createBill: '/api/bills/create-bill/',
  updateStatus: (id) => `/api/bills/${id}/`,
  momo: '/payment/',
  login: '/o/token/',
  flats: '/api/flats/',
  items: '/api/items/',
  createItem: '/api/items/create-item/',
  updateReceived: (id) => `/api/items/${id}/mark_received/`,
  feedback: '/api/feedback/',
  updateResolved: (id) => `/api/feedback/${id}/mark_as_resolved/`,
  famembers: '/api/famembers/',
  survey: '/api/survey/',
  surveyID: (id) => `/api/survey/${id}/`,
  createSurvey: '/api/survey/create-survey/',
  surveyresult: '/api/surveyresult/',
  surveyresultID: (id) => `/api/surveyresult/${id}/`,
  payment: '/api/payment/',
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
        console.error('No token found');
      }
      console.log('Token retrieved successfully:', token);
      return token; // Return token if found
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
