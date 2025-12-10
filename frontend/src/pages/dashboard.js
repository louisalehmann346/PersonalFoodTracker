import "../styles.css"
import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";
const apiUrl = "http://localhost:4000/";


const Dashboard = ({username}) => {
    const [byDate, setByDate] = React.useState([]);
    const [currentGoal, setCurrentGoal] = useState(0);


    useEffect(() => {
        fetch(`${apiUrl}api/returnByDate?userId=${username}`) 
        .then(response => response.json())
        .then(data => setByDate(data))
        .catch(error => console.error("Error fetching byDate data:", error));      
    }, [username]);

    useEffect(() => {
        axios.get(`${apiUrl}api/returnUser?userId=${username}`) 
         .then((response) => {
            setCurrentGoal(response.data.dailyGoal ?? 0);
         })
         .catch((err) => console.error("Error fetching goal:", err));
      }, [username, currentGoal]);

    const byDateMap = React.useMemo(() => {
    const map = {};
    byDate.forEach(day => {
        map[day._id] = day;
    });
    return map;
    }, [byDate]);

    const Calendar = useRef(null);
    let j = 0;
    const formatter = new Intl.DateTimeFormat('default', { month: 'long' });
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const month1 = formatter.format(month);

    useEffect(() => {

        if (j === 0){

        if (Calendar.current) {
            Calendar.current.innerHTML = '';
            // Create the new DOM element
            let days = new Date(year, month+1, 0).getDate();
            let dayOfWeek = new Date(year, month,1).getDay();
            let enddays = (dayOfWeek + days)%7;

            for (let i = 0; i<dayOfWeek; i++){
                const emptyDay = document.createElement('div');
                emptyDay.className = 'gridbox-item empty';
                emptyDay.innerHTML = ``;
                Calendar.current.appendChild(emptyDay);
            }
            for (let i = 1; i<=days; i++){
                const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
                const dayData = byDateMap[dayStr];

                const day = document.createElement('div');
                day.className = 'gridbox-item';
                day.innerHTML = `Day ${i}`;


                if (dayData) {
                    // const dayGoal = document.createElement("p");
                    // dayGoal.className = 'goal';
                    // dayGoal.innerHTML = `Current Goal: ${currentGoal}`;
                    // day.appendChild(dayGoal);

                    const calories = document.createElement("p");
                    calories.textContent = `Calories: ${dayData.totalCalories}`;
                    day.appendChild(calories);

                    const metGoal = document.createElement("p");
                    if (dayData.totalCalories > currentGoal) {
                        metGoal.className = 'metGoal';
                        metGoal.innerHTML = 'Met Goal!';
                    } else {
                        metGoal.className = 'notGoal';
                        //metGoal.innerHTML = 'Did not meet goal!';
                        metGoal.innerHTML = `${currentGoal - dayData.totalCalories} calories below goal!`;
                    }
                    day.appendChild(metGoal);

                    const protein = document.createElement("p");
                    protein.innerHTML = `Protein: ${dayData.totalProtein}<br><br><b>Meals:</b>`;
                    day.appendChild(protein);



                    const list = document.createElement("ul");
                    dayData.meals.forEach(m => {
                        const li = document.createElement("li");
                        li.textContent = m.name;
                        list.appendChild(li);
                    });
                    day.appendChild(list);
                    } else {
                    const empty = document.createElement("p");
                    empty.textContent = "No data";
                    day.appendChild(empty);
                    }

                // Append the new element to the parent
                Calendar.current.appendChild(day);
            }
            for (let i = 1; i<enddays; i++){
                const emptyDay = document.createElement('div');
                emptyDay.className = 'gridbox-item empty';
                emptyDay.innerHTML = ``;
                Calendar.current.appendChild(emptyDay);
            }

        }
        j++;
    }

    }, [byDateMap, j, year, month, currentGoal]);

    return (
        
        <div className="dashboard">

            <h2>Dashboard</h2>
            {/* Option to switch through years / months */}
            <h3>Month: {month1}</h3>
            <h3>Year: {year}</h3>
            <h3>Daily Calorie Goal: {currentGoal}</h3>
            <div className="day_names">
                    <h5> Sunday</h5>
                    <h5>Monday</h5>
                    <h5>Tuesday</h5>
                    <h5>Wednesday</h5>
                    <h5>Thursday</h5>
                    <h5>Friday</h5>
                    <h5>Saturday</h5>
            </div>
                

            <div className="gridbox-container" id="Calendar" ref={Calendar}>

            </div>
        </div>
    )

    
};

export default Dashboard;