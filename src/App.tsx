import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Contacts } from './pages/Contacts';
import { Login } from './pages/Login';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="takeoff-staff" element={<Contacts/>}/>
      <Route path="contacts" element={<Contacts/>}/>
      <Route path="login" element={<Login isLogin/>}/>
      <Route path="registration" element={<Login />}/>
      <Route path="/" element={<Contacts/>}/>
      <Route path="*" element={(<h2>Страница не найдена ((</h2> )}>
      </Route>
    </Routes>
  </BrowserRouter>

);

export default App;