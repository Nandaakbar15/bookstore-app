import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Admin/Dashboard";
import BookDataAdmin from "./pages/Admin/BookData/IndexBookData";
import AddBookDataAdmin from "./pages/Admin/BookData/AddBookData";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/book_data_admin" element={<BookDataAdmin />} />
        <Route path="/add_book_data" element={<AddBookDataAdmin />} />
      </Routes>
    </>
  );
}

export default App;
