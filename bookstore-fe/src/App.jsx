import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Admin/Dashboard";
import BookDataAdmin from "./pages/Admin/BookData/IndexBookData";
import AddBookDataAdmin from "./pages/Admin/BookData/AddBookData";
import UserDataAdmin from "./pages/Admin/UserData/IndexUserData";
import CategoryDataAdmin from "./pages/Admin/CategoryData/IndexCategory";
import AddCategoryPages from "./pages/Admin/CategoryData/AddCategories";
import AuthorsDataAdmin from "./pages/Admin/AuthorData/IndexAuthorData";
import AddAuthorsPages from "./pages/Admin/AuthorData/AddAuthorData";
import EditBookDataAdmin from "./pages/Admin/BookData/EditBookData";
import EditAuthorsPages from "./pages/Admin/AuthorData/EditAuthorData";
import EditCategoryPages from "./pages/Admin/CategoryData/EditCategories";
import PublisherDataAdmin from "./pages/Admin/PublisherData/IndexPublisher";
import AddPublisherPages from "./pages/Admin/PublisherData/AddPublisher";
import EditPublisherPages from "./pages/Admin/PublisherData/EditPublisher";
import CustomerPages from "./pages/Customers/CustomerPage";
import ShopBooksPages from "./pages/Customers/ShopBooksPage";
import LoginPages from "./pages/LoginPages";
import DetailBooksPages from "./pages/Customers/DetailBooksPage";
import RegisterPages from "./pages/RegisterPage";

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
        <Route path="/" element={<Navigate to={"/customer_pages"} />} />
        <Route path="/customer_pages" element={<CustomerPages />} />
        <Route path="/shopbooks" element={<ShopBooksPages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detailBooks/:id" element={<DetailBooksPages />} />
        <Route path="/loginPages" element={<LoginPages />} />
        <Route path="/registerPages" element={<RegisterPages />} />
        <Route path="/book_data_admin" element={<BookDataAdmin />} />
        <Route path="/add_book_data" element={<AddBookDataAdmin />} />
        <Route path="/edit_book/:id" element={<EditBookDataAdmin />} />
        <Route path="/category_data_admin" element={<CategoryDataAdmin />} />
        <Route path="/add_category_data" element={<AddCategoryPages />} />
        <Route path="/edit_categories/:id" element={<EditCategoryPages />} />
        <Route path="/author_data_admin" element={<AuthorsDataAdmin />} />
        <Route path="/add_author_data" element={<AddAuthorsPages />} />
        <Route path="/edit_author_data/:id" element={<EditAuthorsPages />} />
        <Route path="/publisher_data_admin" element={<PublisherDataAdmin />} />
        <Route path="/add_publisher_data" element={<AddPublisherPages />} />
        <Route path="/edit_publisher_data" element={<EditPublisherPages />} />
        <Route path="/user_data_admin" element={<UserDataAdmin />} />
      </Routes>
    </>
  );
}

export default App;
