import { useEffect, useState } from "react";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";

import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";

export default function BookDataAdmin() {
  const [books, setBooks] = useState([]);
  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllBooks",
      );

      setBooks(response.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
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
                  Book Data
                </h1>

                <div className="mt-4">
                  <Link
                    to="/add_book_data"
                    className="inline-block text-white bg-blue-500 rounded-lg shadow-lg px-4 py-2 hover:bg-blue-700"
                  >
                    Add Book
                  </Link>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Cover
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Author
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Price
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        <img
                          src={`http://localhost:3000/images/${book.cover}`}
                          alt={book.title}
                          srcset=""
                          width={"32"}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {book.title}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {book.author}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {book.category.name}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        Rp. {book.price}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                        <Link
                          to={`/edit_book/${book.id}`}
                          className="inline-block text-white rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700 px-4 py-2"
                        >
                          Edit
                        </Link>

                        <button
                          type="submit"
                          className="inline-bloeck text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Paginations */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={paginations.current_page === 1}
                  onClick={() => fetchBooks(paginations.current_page - 1)}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Halaman {paginations.current_page} dari{" "}
                  {paginations.last_page}
                </span>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={paginations.current_page === paginations.last_page}
                  onClick={() => fetchBooks(paginations.current_page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
