import axiosInstance from "./axiosInstance";

export const registerRequest = (data) =>
  axiosInstance.post("/users/signup", data);

export const loginRequest = (data) =>
  axiosInstance.post("/users/signin", data);

export const logoutRequest = () => axiosInstance.post("/users/signout");

export const getCurrentUserRequest = () => axiosInstance.get("/users/current");
