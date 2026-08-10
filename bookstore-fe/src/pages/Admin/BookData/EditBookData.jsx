import { useEffect, useState } from "react";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import axios from "axios";

import Modal from "../../../components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBookDataAdmin() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [title, setTitles] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isbn, setIsBn] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCovers] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCovers(file);
    setPreview(URL.createObjectURL(file)); // Membuat preview dari file yang dipilih
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllCategories?limit=100",
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/getAllAuthor?limit=100",
      );

      setAuthors(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
      setShowModal(true);
      setMessage("Cannot fetch the data!");
    }
  };

  const fetchPublisher = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/getAllPublisher?limit=100",
      );

      setPublishers(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const editBook = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("categoryId", categoryId);
      formData.append("authorId", authorId);
      formData.append("isbn", isbn);
      formData.append("description", description);
      formData.append("stock", stock);

      if (publisherId) {
        formData.append("publisherId", publisherId);
      }

      if (cover) {
        formData.append("cover", cover);
      }

      const res = await axios.put(
        `http://localhost:3000/api/admin/updateBook/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setMessage(res.data.message);
      setShowModal(true);

      // Navigate after showing modal for 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/book_data_admin");
      }, 2000);
    } catch (error) {
      console.error("error", error);
      setMessage(
        `Error: ${error.response?.data?.message || "Failed to edit book!"}`,
      );
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const getBooksById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getBookById/${id}`,
        );

        const {
          title,
          price,
          cover,
          authorId,
          categoryId,
          publisherId,
          isbn,
          description,
          stock,
        } = res.data.data;

        setTitles(title);
        setPrice(price);
        setAuthorId(authorId);
        setCategoryId(categoryId);
        setPublisherId(publisherId || "");
        setIsBn(isbn || "");
        setDescription(description || "");
        setStock(stock || 0);
        setPreview(cover ? `http://localhost:3000/images/${cover}` : null);
      } catch (error) {
        console.error("Error : ", error);
        setMessage("Failed to load book data!");
        setShowModal(true);
      }
    };

    fetchCategories();
    fetchAuthors();
    fetchPublisher();
    getBooksById();
  }, [id]);

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
                  Form edit Book Data
                </h1>
              </div>
            </div>

            {/* Table */}
            <div className="mx-auto mt-10 max-w">
              <Card>
                <CardContent>
                  <form className="space-y-4 p-6" onSubmit={editBook}>
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
                        name="title"
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
                        name="authorId"
                        onChange={(e) => setAuthorId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-lg focus:ring-brand focus:border-brand placeholder:text-body"
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
                        htmlFor="publisher"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Publisher <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="publisherId"
                        value={publisherId}
                        name="publisherId"
                        onChange={(e) => setPublisherId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-lg focus:ring-brand focus:border-brand placeholder:text-body"
                        required
                      >
                        <option value="">-- Choose publisher --</option>
                        {publishers.map((publisher) => (
                          <option value={publisher.id} key={publisher.id}>
                            {publisher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="isbn"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Isbn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={isbn}
                        onChange={(e) => setIsBn(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Add isbn..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                        placeholder="Write the description..."
                      ></textarea>
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
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body"
                        placeholder="Add Price"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="price"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body"
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
                        name="categoryId"
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg shadow-lg focus:ring-brand focus:border-brand placeholder:text-body"
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
                      {preview && (
                        <div>
                          <img src={preview} alt="" srcSet="" width={"100"} />
                          <input
                            type="file"
                            id="cover"
                            onChange={handleFileChange}
                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-500 hover:bg-blue-700 font-medium leading-5 rounded-lg shadow-lg px-4 py-2"
                    >
                      Edit!
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
