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

export const getDictionariesId = ({ id }) => {
    return axios.get(`${API_URL}/dictionaries/${id}`);
};

export const updateDictionaries = ({ id, userInput }) => {
    return axios.put(`${API_URL}/dictionaries/${id}`, userInput);
};

export const addDictionaries = ({ flashcardData }) => {
    return axios.post(`${API_URL}/dictionaries`, flashcardData);
};

export const getDictionariesWords = () => {
    return axios.get(`${API_URL}/dictionaries_words`);
};

export const addDictionariesWords = ({ userWord }) => {
    return axios.post(`${API_URL}/dictionaries_words`, userWord);
};

export const updateDictionariesWords = ({ userWord }) => {
    return axios.put(`${API_URL}/dictionaries_words`, userWord);
};
