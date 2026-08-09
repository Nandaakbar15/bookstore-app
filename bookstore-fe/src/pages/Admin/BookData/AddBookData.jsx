import { useEffect, useState } from "react";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import FilterButton from "../../../components/DropdownFilter";
import Banner from "../../../partials/Banner";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

import Modal from "../../../components/Modal";
import { Link, useNavigate } from "react-router-dom";

export default function AddBookDataAdmin() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitles] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [price, setPrice] = useState(0);
  const [cover, setCovers] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllCategories",
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/getAllAuthor",
      );

      setAuthors(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
      setShowModal(true);
      setMessage("Cannot fetch the data!");
    }
  };

  const addNewBook = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("cover", cover);
      formData.append("categoryId", categoryId);
      formData.append("authorId", authorId);

      const res = await axios.post(
        "http://localhost:3000/api/admin/createBooks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setMessage(res.data.message);
      setShowModal(true);

      // Reset the form
      setTitles("");
      setPrice("");
      setCategoryId("");
      setAuthorId("");
      setCovers(null);

      // Navigate after showing modal for 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/book_data_admin");
      }, 2000);
    } catch (error) {
      console.error("error", error);
      setMessage("Error: Failed to add book!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <p>{message}</p>
            </Modal>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Form add new Book Data
                </h1>
              </div>
            </div>

            {/* Table */}
            <div className="mx-auto mt-10 max-w">
              <Card>
                <CardContent>
                  <form className="space-y-4 p-6" onSubmit={addNewBook}>
                    <div className="mb-5">
                      <label
                        htmlFor="title"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitles(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Add title"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="author"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Author <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="authorId"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        required
                      >
                        <option value="">-- Choose authors --</option>
                        {authors.map((author) => (
                          <option value={author.id} key={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="price"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Add Price"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="categoryId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        required
                      >
                        <option value="">Choose category</option>
                        {categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="cover"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Cover <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        id="cover"
                        onChange={(e) => setCovers(e.target.files[0])}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-500 hover:bg-blue-700 font-medium leading-5 rounded-lg shadow-lg px-4 py-2"
                    >
                      Add!
                    </button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Link
                    to={"/book_data_admin"}
                    className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
                  >
                    Back
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
