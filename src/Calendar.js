import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Calendar = () => {
    const location = useLocation();
    const allTodosFetch = location.state?.allTodos || {};
    const username = location.state?.username || '';
    const [allTodos, setAllTodos] = useState(allTodosFetch);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
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

        // week days header
        const daysArray = [<div key="days-header-sun" className="days-header"><div>Sun</div></div>, 
                            <div key="days-header-mon" className="days-header"><div>Mon</div></div>, 
                            <div key="days-header-tue" className="days-header"><div>Tue</div></div>, 
                            <div key="days-header-wed" className="days-header"><div>Wed</div></div>, 
                            <div key="days-header-thu" className="days-header"><div>Thu</div></div>, 
                            <div key="days-header-fri" className="days-header"><div>Fri</div></div>, 
                            <div key="days-header-sat" className="days-header"><div>Sat</div></div>];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            const dateString = currentDate.toLocaleDateString();
            const hasTodo = allTodos[dateString]?.length > 0;

            daysArray.push(
                <div
                    key={`day-${i}`}
                    className={`calendar-day ${hasTodo ? 'has-todo' : ''}`}
                    onClick={() => handleDayClick(currentDate)}
                >
                    {i}
                </div>
            );
        }

        return daysArray;
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setModalOpen(true);
    };

    const handleSaveTodo = async () => {
        const date = selectedDate.toLocaleDateString();
        const updatedTodos = {
            ...allTodos,
            [date]: [...(allTodos[date] || []), newTodo],
        };

        setAllTodos(updatedTodos);
        setNewTodo('');
        console.log(updatedTodos);
    
        try {
            await axios.post('http://localhost:5000/api/updateTodo', { updatedTodos, username });
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const handleDeleteTodo = async (index) => {
        const date = selectedDate.toLocaleDateString();
        const updatedTodos = {
            ...allTodos,
            [date]: allTodos[date].filter((_, i) => i !== index),
        };
        if (updatedTodos[date].length === 0) {
            delete updatedTodos[date];
        }

        setAllTodos(updatedTodos);
        setNewTodo('');
        console.log(updatedTodos);

        try {
            await axios.post('http://localhost:5000/api/updateTodo', { updatedTodos, username });
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };
    
    const handleCancel = () => {
        setModalOpen(false);
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

            {/* Modal */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Todos for {selectedDate.toLocaleDateString()}</h3>
                        <ul>
                            {allTodos[selectedDate.toLocaleDateString()]?.map((todo, index) => (
                                <li key={index} className="todo-item">
                                    <span className="todo-text">{todo}</span>
                                    <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <div className="modal-footer">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new todo"
                            />
                            <button onClick={handleSaveTodo}>Add Todo</button>
                        </div>
                        <button onClick={handleCancel} className="close">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;