import { useState } from "react"

import "./style.css"

import { getCountryAndCity, getIPAddress } from "./api"

function IndexPopup() {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const ipAddress = await getIPAddress()
      const { country, city } = await getCountryAndCity(
        ipAddress,
        process.env.PLASMO_PUBLIC_ACCESS_TOKEN
      )
      setLocation({ country, city })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-[500px] h-[500px] bg-slate-900">
      <button
        className={`text-black text-3xl font-bold border-4 border-amber-300 bg-white ${
          loading ? "cursor-not-allowed" : ""
        }`}
          onClick={fetchData}
          disabled={loading}
        >
        {/* Show My Location */}
        {loading ? 'Loading...' : 'Show My Location'}
        <br />
      </button>
      {location && (
        <p className="text-white text-2xl font-bold mt-5 text-center">
          Your Country is {location.country} and city is {location.city}
        </p>
      )}
    </div>
  )
}

export default IndexPopup
