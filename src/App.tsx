import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Contacts } from './pages/Contacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="takeoff-staff" element={<Contacts/>}/>
        <Route path="contacts" element={<Contacts/>}/>
        <Route path="login" element={(<Link to="/contacts">Контакты</Link>)}/>
        <Route path="*" element={(<h2>Страница не найдена ((</h2> )}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
