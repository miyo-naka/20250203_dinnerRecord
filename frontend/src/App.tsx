// //src/App.tsx
// import { useEffect, useState } from "react";
// import { fetchHello } from "./api";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Record from "./Record";
import History from "./History";
import "./App.css";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetchHello().then((data) => setMessage(data.message));
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
