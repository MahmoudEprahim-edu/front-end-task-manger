import axios from "axios"
import API_URL from "./config"

// Function to test API connection
const testApiConnection = async () => {
  try {
    console.log("Testing API connection to:", API_URL)
    const response = await axios.get(`${API_URL}/test`)
    console.log("API Connection successful:", response.data)
    return { success: true, data: response.data }
  } catch (error) {
    console.error("API Connection failed:", error.message)
    return { success: false, error: error.message }
  }
}

export default testApiConnection
