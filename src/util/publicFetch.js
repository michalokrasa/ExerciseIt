import axios from "axios";
import { API_URL } from "../config";

const publicFetch = axios.create({
  baseURL: API_URL
});

export { publicFetch };