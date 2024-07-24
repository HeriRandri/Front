import { useEffect, useState } from "react";
import Article from "./Page/Article";
import Navbar from "./Page/Navbar";
import Header from "./Page/header";
import Login from "./Page/login";
import SignUp from "./Page/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Tech from "./pageCatergories/tech";
import Sport from "./pageCatergories/sport";
import World from "./pageCatergories/world";
import Health from "./pageCatergories/heath";
import Science from "./pageCatergories/science";
import ProtectedRoute from "./Page/ProtectRoute";
import Reset from "./Page/Reset";
import "./App.css";
import LoginTest from "./PageTest/LoginTest";

axios.defaults.baseURL = "https://backfichier.onrender.com";
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  const [isNav, setIsNav] = useState(false);

  useEffect(() => {
    setIsNav(<Article />);
  }, []);

  return (
    <div className=" max-h-screen">
      {/* <AuthProvider> */}
      {isNav ? <Navbar className="flex-none" /> : <Article />}

      <Router>
        <div className="h-screen col-span-1 sm:h-screen">
          <div className="content">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginTest" element={<LoginTest />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/home" element={<Article />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/technology" element={<Tech />} />
              <Route path="/sport" element={<Sport />} />
              <Route path="/world" element={<World />} />
              <Route path="/health" element={<Health />} />
              <Route path="/science" element={<Science />} />
              <Route element={<ProtectedRoute />} />
              <Route path="/" element={<Header />} />
            </Routes>
          </div>
        </div>
      </Router>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
