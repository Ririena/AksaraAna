import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPages from "./pages/LoginPages.jsx"
import Materi from "./pages/Materi"
import DetailMateri from "./pages/DetailMateri.jsx";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<LoginPages />}></Route>
            <Route exact path="/materi" element={<Materi/>}></Route>
            <Route exact path="/materi/detail/:materiId" element={<DetailMateri/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
