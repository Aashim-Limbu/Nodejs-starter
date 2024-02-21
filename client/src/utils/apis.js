import axios from "axios";
export const apis = axios.create({
	baseURL: "http://localhost:8001/api/v1",
	withCredentials: true,
});
