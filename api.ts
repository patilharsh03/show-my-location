import axios from "axios"

export const getIPAddress = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json")
    return response.data.ip
  } catch (error) {
    console.error("Error fetching IP address:", error)
    throw error
  }
}

export const getCountryAndCity = async (
  ipAddress: string,
  accessToken: string
): Promise<{ country: string; city: string }> => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}?token=${accessToken}`
    )
    const { country, city } = response.data
    return { country, city }
  } catch (error) {
    console.error("Error", error)
    throw error
  }
}
