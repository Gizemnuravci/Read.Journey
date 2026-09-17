import axiosInstance from "./axiosInstance";

export const getRecommendedBooks = (
  page = 1,
  limit = 10,
  title = "",
  author = "",
) =>
  axiosInstance.get("/books/recommend", {
    params: { page, limit, title, author },
  });

export const getOwnBooks = (status = "") =>
  axiosInstance.get("/books/own", { params: { status } });

export const getBookById = (id) => axiosInstance.get(`/books/${id}`);

export const addBookRequest = (data) => axiosInstance.post("/books/add", data);

export const addBookByIdRequest = (id) =>
  axiosInstance.post(`/books/add/${id}`);

export const deleteBookRequest = (id) =>
  axiosInstance.delete(`/books/remove/${id}`);

export const startReadingRequest = (data) =>
  axiosInstance.post("/books/reading/start", data);

export const stopReadingRequest = (data) =>
  axiosInstance.post("/books/reading/finish", data);

export const deleteReadingRequest = (bookId, readingId) =>
  axiosInstance.delete("/books/reading", { params: { bookId, readingId } });
