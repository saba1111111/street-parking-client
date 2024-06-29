import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import useFetch from "../../hooks/use-fetch";

function ParkingPage() {
  const { get, post } = useFetch();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [parkingStarted, setParkingStarted] = useState(false);
  const [parkingStopped, setParkingStopped] = useState(false);
  const [parkingPrice, setParkingPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await get("/places/cities");
        if (!response.success) {
          throw new Error("Failed to fetch cities");
        }
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event) => {
    const cityId = parseInt(event.target.value);
    const city = cities.find((c) => c.id === cityId);
    setSelectedCity(city);
    setSelectedLocation(null);
  };

  const handleLocationChange = (event) => {
    const locationId = parseInt(event.target.value);
    const location = selectedCity.locations.find(
      (loc) => loc.id === locationId
    );
    setSelectedLocation(location);
  };

  const handleStartParking = async () => {
    try {
      const response = await post("/parkings/start", {
        userId: 1, // Replace with actual user ID logic
        locationId: selectedLocation.id,
      });

      if (!response.success) {
        throw new Error("Failed to start parking");
      }

      setParkingStarted(true);
    } catch (error) {
      console.error("Error starting parking:", error);
    }
  };

  const handleStopParking = async () => {
    try {
      const response = await post("/parkings/finish", {
        userId: 1,
        locationId: selectedLocation.id,
      });

      if (!response.success) {
        throw new Error("Failed to stop parking");
      }

      setParkingPrice(response.data.amount);
      setParkingStopped(true);
    } catch (error) {
      console.error("Error stopping parking:", error);
    }
  };

  const handleStartAgain = () => {
    setSelectedCity(null);
    setSelectedLocation(null);
    setParkingStarted(false);
    setParkingStopped(false);
    setParkingPrice(null);
  };

  const handleViewHistory = () => {
    navigate("/parking-history");
  };

  return (
    <div className="parking-page">
      <h2>Parking Page</h2>
      <div className="city-selection">
        <label>Select City:</label>
        <select
          value={selectedCity ? selectedCity.id : ""}
          onChange={handleCityChange}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div className="location-selection">
          <label>Select Location:</label>
          <select
            value={selectedLocation ? selectedLocation.id : ""}
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            {selectedCity.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLocation && (
        <div className="parking-buttons">
          {!parkingStarted && (
            <button onClick={handleStartParking}>Start Parking</button>
          )}
          {parkingStarted && !parkingStopped && (
            <button onClick={handleStopParking}>Stop Parking</button>
          )}
        </div>
      )}

      {parkingStopped && parkingPrice !== null && (
        <div className="parking-price">
          <p>Parking Price: ${parkingPrice}</p>
          <button onClick={handleStartAgain}>Start Again</button>
        </div>
      )}

      <br />
      <hr />

      <button onClick={handleViewHistory}>View Parking History</button>
    </div>
  );
}

export default ParkingPage;
