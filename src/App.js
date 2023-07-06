import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';
import { useState } from 'react';
function App() {

  const [alert, setAlert] = useState(null)
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => { setAlert(null); }, 1000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={ alert}/>
          <Routes>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
