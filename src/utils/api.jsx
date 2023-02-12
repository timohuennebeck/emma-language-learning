import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
    return axios.get(`${API_URL}/users`);
};

export const getTeachers = async () => {
    return axios.get(`${API_URL}/teachers`);
};

export const getTeachersId = async ({ id }) => {
    return axios.get(`${API_URL}/teachers/${id}`);
};

export const getReviews = async () => {
    return axios.get(`${API_URL}/reviews`);
};

export const getReadings = async () => {
    return axios.get(`${API_URL}/readings`);
};

export const getDictionaries = async () => {
    return axios.get(`${API_URL}/dictionaries`);
};

export const getDictionariesId = async ({ id }) => {
    return axios.get(`${API_URL}/dictionaries/${id}`);
};

export const updateDictionaries = async ({ id, userInput }) => {
    return axios.put(`${API_URL}/dictionaries/${id}`, userInput);
};

export const addDictionaries = async ({ flashcardData }) => {
    return axios.post(`${API_URL}/dictionaries`, flashcardData);
};

export const getDictionariesWords = async () => {
    return axios.get(`${API_URL}/dictionaries_words`);
};

export const addDictionariesWords = async ({ userWord }) => {
    return axios.post(`${API_URL}/dictionaries_words`, userWord);
};

export const updateDictionariesWords = async ({ userWord }) => {
    return axios.put(`${API_URL}/dictionaries_words`, userWord);
};
