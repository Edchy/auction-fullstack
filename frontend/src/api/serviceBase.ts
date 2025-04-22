import axios from "axios";

export const BASE_URL = "http://localhost:3000";

//Refactor this file to use one fucntion for all CRUD operations
// and use generics to make it more reusable

/**
 * Simple function to fetch data from an API endpoint
 * @param url The URL to fetch data from
 * @returns The data from the response
 */
export async function fetchData<T = any>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // log then re-throw
    // tillåter att den kod som anropar denna funktion kan hantera felet
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postData<T = any>(url: string, data: T): Promise<T> {
  try {
    const response = await axios.post<T>(url, data, {
      withCredentials: true, // This is now in the config object
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
