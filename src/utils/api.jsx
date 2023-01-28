import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const getTeachers = () => {
    return axios.get(`${API_URL}/teachers`);
};

export const getTeachersId = ({ id }) => {
    return axios.get(`${API_URL}/teachers/${id}`);
};

export const getReviews = () => {
    return axios.get(`${API_URL}/reviews`);
};

export const getReadings = () => {
    return axios.get(`${API_URL}/readings`);
};

export const getDictionaries = () => {
    return axios.get(`${API_URL}/dictionaries`);
};

export const getDictionariesWords = () => {
    return axios.get(`${API_URL}/dictionaries_words`);
};

export const addDictionariesWords = ({ userInput }) => {
    return axios.post(`${API_URL}/dictionaries_words`, userInput);
};
