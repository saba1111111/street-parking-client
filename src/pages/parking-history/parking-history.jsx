import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import "./index.css";
import { useNavigate } from "react-router-dom";

function ParkingHistoryPage({ userId = 1 }) {
  const { loading, error, get } = useFetch();
  const [parkingHistory, setParkingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        const { data } = await get(`/parkings/${userId}`);
        console.log(data);
        setParkingHistory(data); // Assuming data is an array of parking sessions
      } catch (error) {
        console.error("Error fetching parking history:", error);
      }
    };

    fetchParkingHistory();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")} className="navigate-back-button">
        Go Back
      </button>

      <div className="parking-history-page">
        <h2>Parking History</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {parkingHistory.length === 0 && !loading && (
          <p>No parking history found.</p>
        )}
        {parkingHistory.length > 0 && (
          <div className="parking-history-list">
            {parkingHistory.map((parking) => (
              <div key={parking.id} className="parking-history-item">
                <p>Location: {parking.location.name}</p>
                <p>Start Time: {new Date(parking.startAt).toLocaleString()}</p>
                <p>End Time: {new Date(parking.finishAt).toLocaleString()}</p>
                <p>Status: {parking.status}</p>
                <p>Amount: ${parking.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingHistoryPage;
