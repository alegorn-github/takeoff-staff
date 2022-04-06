import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Contacts } from './pages/Contacts';

const App = () => (
  // const [isVisible, setIsVisible] = useState(false);
  // return (
  // <div className="App">
  //   <Button type="primary" onClick={()=>setIsVisible((prev)=>!prev)}>Button</Button>
  //   {isVisible ? 'true':'false'}
  //   <Modal visible={isVisible} onOk={()=>setIsVisible(false)} onCancel={()=>setIsVisible(false)}>
  //     Cool modal
  //   </Modal>
  // </div>

  <BrowserRouter>
    <Routes>
      <Route path="takeoff-staff" element={<Contacts/>}/>
      <Route path="contacts" element={<Contacts/>}/>
      <Route path="login" element={(<Link to="/contacts">Контакты</Link>)}/>
      <Route path="/" element={<Contacts/>}/>
      <Route path="*" element={(<h2>Страница не найдена ((</h2> )}>
      </Route>
    </Routes>
  </BrowserRouter>

);

export default App;