import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from './pages/Profile'
import { store } from "./app/store";
import { Provider } from "react-redux";
import Course from "./pages/Course";
import Qcm from "./pages/Qcm";
import Admin from "./pages/Admin";
import Teacher from './pages/Teacher'



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Navbar />
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/course" element={<Course/>}/>
          <Route path="/qcm" element={<Qcm/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/teacher" element={<Teacher/>}/>
        </Routes>
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
