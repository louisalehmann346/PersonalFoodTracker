import React, { useState, useEffect } from "react";
import "../styles.css"
import axios from "axios";
const apiUrl = "https://personalfoodtracker.onrender.com/";

const Log = ({username}) => {
    const [mealOptions, setMealOptions] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [date, setDate] = useState("");
    const [logs, setLogs] = useState([]);

    useEffect(() => {
      axios.get(`${apiUrl}api/returnMeals`)
        .then((response) => setMealOptions(response.data))
        .catch((err) => console.error("Error fetching meals:", err));
    }, []);

    const fetchLogs = () => {
      axios.get(`${apiUrl}api/returnTracker?userId=${username}`) 
        .then((response) => setLogs(Array.isArray(response.data) ? response.data : []))
        .catch((err) => console.error("Error fetching logs:", err));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = username; 
        const newTracker = {
          userId: userId, 
          meal: selectedMeal,
          date: date
        };

        console.log("Submitting new tracker:", newTracker);

        try {
          const response = await axios.post(`${apiUrl}api/setTracker`, newTracker);
          console.log("Server response:", response.data);
          fetchLogs();

          setSelectedMeal("");
          setDate("");
        }
        catch (err) {
          console.error("Error logging meal:", err);
        }
    };

    const handleDelete = async (logId) => {
      try {
        await axios.delete(`${apiUrl}api/deleteTracker/${logId}`)
        .then((response) => {
          console.log("Delete response:", response.data);
        });
        fetchLogs();
      } catch (err) {
        console.error("Error deleting log:", err);
      }
    };

    return (
    <div className="log-page">
      <h2>Log a Meal for Yourself</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal:
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="">Select a meal</option>
            {mealOptions.map((meal) => (
              <option key={meal._id} value={meal.name}>
                {meal.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Log Meal</button>
      </form>
      <div>
<h2>User Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal</th>
              <th>Calories (kCal)</th>
              <th>Protein (g)</th>
              <th>(Delete)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>
                  {new Date(log.date).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>{log.meal}</td>
                <td>{mealOptions.find(meal => meal.name === log.meal)?.calories || "N/A"}</td>
                <td>{mealOptions.find(meal => meal.name === log.meal)?.protein || "N/A"}</td>
                <td><button onClick={() => handleDelete(log._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    )
};

export default Log;
