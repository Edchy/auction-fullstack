import axios from "axios";
import { BASE_URL } from "./serviceBase";

interface UserData {
  name: string;
  _id: string;
  email: string;
}

interface AuthResponse {
  user: UserData;
}

interface RegisterResponse {
  user: UserData;
  message: string;
}

const API_URL = `${BASE_URL}/login`;
const REGISTER_URL = `${BASE_URL}/register`;

// Now properly type the function
export async function loginWithCredentials(
  email: string,
  password: string
): Promise<{ data: AuthResponse; status: number }> {
  try {
    const response = await axios.post<AuthResponse>(
      API_URL,
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Gets the currently authenticated user's information
 * @returns Promise containing user data or null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthResponse | null> {
  try {
    const response = await axios.get<AuthResponse>(`${BASE_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

///Register
export async function registerWithCredentials(
  name: string,
  email: string,
  password: string
): Promise<{ data: RegisterResponse; status: number }> {
  try {
    const response = await axios.post<RegisterResponse>(
      REGISTER_URL,
      { name, email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}
