import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODFjNGQ4YjFhZTEwYjNjNTlmYzc3ZDIwMjMwZjY4NyIsIm5iZiI6MTc0MzcxOTM2NS4zMzksInN1YiI6IjY3ZWYwYmM1YjNlMDM1Mjg2Y2Q5MjJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cRdt5G0L3gbYeYuDffI4IAZSAo0wUinRLERoW0b_5_8';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export const fetchTrendingMovies = async () => {
    const resp = await axiosInstance.get('/trending/movie/day')
    return resp.data.results;
}

export const fetchMovieById = async (movieId) => {
  const resp = await axiosInstance.get(`/movie/${movieId}`)
    return resp.data;
}

export const fetchCast = async (movieId) => {
  const resp = await axiosInstance.get(`/movie/${movieId}/credits`)
    return resp.data.cast; 
}

export const fetchReviews = async (movieId) => {
  const resp = await axiosInstance.get(`/movie/${movieId}/reviews`)
    return resp.data.results; 
}

export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};