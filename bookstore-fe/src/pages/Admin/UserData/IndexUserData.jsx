import { useEffect, useState } from "react";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import FilterButton from "../../../components/DropdownFilter";
import Banner from "../../../partials/Banner";

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
  const [users, setBooks] = useState([]);
  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllUsers",
      );

      setBooks(response.data.data);
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
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  User Data
                </h1>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Username
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Role
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {user.email}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {user.username}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {user.role}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                        <Link
                          to={`/edit_user/${user.id}`}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
