import "../styles.css"
import Header from "./navbar";
import React, { useRef, useEffect } from 'react';


const Dashboard = ({username}) => {
    const [byDate, setByDate] = React.useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/api/returnByDate?userId=${username}`) 
        .then(response => response.json())
        .then(data => setByDate(data))
        .catch(error => console.error("Error fetching byDate data:", error));        
    }, [username]);

    const byDateMap = React.useMemo(() => {
    const map = {};
    byDate.forEach(day => {
        map[day._id] = day;
    });
    return map;
    }, [byDate]);

    const Calendar = useRef(null);
    let j = 0;
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

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
                    const calories = document.createElement("p");
                    calories.textContent = `Calories: ${dayData.totalCalories}`;
                    day.appendChild(calories);

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

                // const dayNumber = document.createElement('p');
                // dayNumber.textContent =  `Day ${i}`;
                // day.appendChild(dayNumber);

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

    }, [byDateMap, j, year, month]);

    return (
        
        <div className="dashboard">
            <Header/>
            <br/>
            <br/>

            <h2>Dashboard</h2>
            {/* Option to switch through years / months */}
            <h3>Year: 2025</h3>
            <h3>Month: December</h3>
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
            {/* TO DO WORK ON MAKING THIS AN ARRAY OF DAYS */}
                {/* <div className="gridbox-item">Day 1</div> */}


            </div>
        </div>
    )

    
};

export default Dashboard;