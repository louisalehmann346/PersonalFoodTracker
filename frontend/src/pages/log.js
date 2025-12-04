import React, { useState, useEffect } from "react";

const Log = () => {
    const [mealOptions, setMealOptions] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [date, setDate] = useState("");

useEffect(() => {
    fetch("http://localhost:4000/api/meals")
    .then((res) => res.json())
    .then((data) => {
      setMealOptions(data);
    })
    .catch((err) => console.error("Error fetching meals:", err));
}, []);

    return (
    <div className="log-page">
      <h2>Log a Meal for Yourself</h2>
      <form method = "POST" action = "/logMeal">
        <label>
          Meal:
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="">Select a meal</option>
            {mealOptions.map((meal) => (
              <option key={meal._id} value={meal._id}>
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
          />
        </label>
        <br />
        <button type="submit">Log Meal</button>
      </form>
    </div>
    )
};

export default Log;