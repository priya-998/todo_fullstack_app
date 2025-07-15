import React from "react";
import { BrowserRouter, Routes, Route, Navigate ,Outlet } from "react-router-dom";
import Login from "./Login";
import Register from './Register';
import TaskList from "./TaskList";
import'./styles.css';


function ProtectedRoute (){
  const token = localStorage.getItem("access_token");
  return token? <Outlet />: <Navigate to="/login" />;
}

function App(){
 return(
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register />
       }
       />
       <Route element={<ProtectedRoute />}>
       <Route path="/tasks" element={<TaskList />} />
       </Route>
           <Route path="/" element={<Navigate to="/tasks" />} />

    </Routes>
    </BrowserRouter>
    
    );
    }

   

export default App;