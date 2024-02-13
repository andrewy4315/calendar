import React, { useState } from 'react';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const renderDays = () => {
    
        const daysInMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ).getDate();

        const firstDayOfMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        ).getDay();

        const daysArray = [];

        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Sun</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Mon</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Tue</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Wed</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Thu</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Fri</div>
            </div>
        );
        daysArray.push(
            <div key="days-header" className="days-header">
                <div>Sat</div>
            </div>
        );

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(
            <div 
                key={`day-${i}`} 
                className="calendar-day" 
                onClick={() => handleDayClick(i + 1)}
            >
                {i}
            </div>
            );
        }

        return daysArray;
    };

    const handleDayClick = (day) => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
        setShowPopup(true);
    };

    const handleSaveTodo = () => {
        //send request to server to save
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };
    
    const handleCancel = () => {
        setShowPopup(false);
        setNewTodo('');
    };

    return (
        <div className="calendar-container">
            {/* Calendar header */}
            <div className="calendar-header">
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                &lt; Prev
            </button>
            <h2>{new Date(selectedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                Next &gt;
            </button>
            </div>

            {/* Calendar body */}
            <div className="calendar-body">
            {renderDays()}
            </div>

            {/* Popup for adding and managing to-dos */}
            {showPopup && (
                <div className="popup">
                <textarea
                    placeholder="Add a to-do for the day..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <ul>
                    {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
                    ))}
                </ul>
                <div className="popup-buttons">
                    <button onClick={handleSaveTodo}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;