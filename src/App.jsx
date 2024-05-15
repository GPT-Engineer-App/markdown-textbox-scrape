import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index.jsx";

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Timeout reached");
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
