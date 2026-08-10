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

export default function PublisherDataAdmin() {
  const [publisher, setPublisher] = useState([]);
  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const fetchPublisher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getAllPublisher",
      );

      setPublisher(response.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchPublisher();
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
                  Publisher Data
                </h1>

                <div className="mt-5">
                  <Link
                    to={"/add_publisher_data"}
                    className="inline-block text-white px-4 py-2 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700"
                  >
                    Add Publisher
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
                      Publiser ID
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Phone
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Address
                    </TableHead>
                    <TableHead className="font-semibold text-[16px] px-4 py-2">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publisher.map((publisher) => (
                    <TableRow key={publisher.id}>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {publisher.id}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {publisher.name}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {publisher.phone}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {publisher.address}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                        <Link
                          to={`/edit_publisher/${publisher.id}`}
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
                  onClick={() => fetchPublisher(paginations.current_page - 1)}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {paginations.current_page} from {paginations.last_page}
                </span>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={paginations.current_page === paginations.last_page}
                  onClick={() => fetchPublisher(paginations.current_page + 1)}
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
