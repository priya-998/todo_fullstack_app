import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        API.get('/tasks/')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    };

    const createTask = (e) => {
        e.preventDefault();
        API.post('/tasks/', { title: newTitle })
            .then(() => {
                getTasks();
                setNewTitle("");
            })
            .catch(err => alert(err));
    };

    const deleteTask = (id) => {
        API.delete(`/tasks/${id}/`)
            .then(() => getTasks())
            .catch(err => alert(err));
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
    };

    const saveEdit = (id) => {
        API.patch(`/tasks/${id}/`, { title: editTitle })
            .then(() => {
                getTasks();
                setEditingId(null);
                setEditTitle("");
            })
            .catch(err => alert("Failed to update task"));
    };

    const toggleComplete = (task) => {
        API.patch(`/tasks/${task.id}/`, { completed: !task.completed })
            .then(() => getTasks())
            .catch(err => alert("Failed to update status"));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div>
           <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <form onSubmit={createTask}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add a new task"
                    required
                />
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task)}
                        />
                        {editingId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <button onClick={() => saveEdit(task.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {task.title}
                                <button onClick={() => startEdit(task)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;