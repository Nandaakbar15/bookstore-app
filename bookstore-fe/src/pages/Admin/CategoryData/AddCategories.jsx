import axios from "axios";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import { useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../../../components/Modal";

export default function AddCategoryPages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addCategories = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/createCategories",
        {
          name: name,
        },
      );

      setMessage(res.data.response);
      setShowModal(true);

      // clear the form
      setName("");

      setTimeout(() => {
        setShowModal(false);
        navigate("/category_data_admin");
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

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
                  Add Categories Form
                </h1>
              </div>
            </div>

            {/* Form */}
            <div className="mx-auto mt-10 max-w">
              <Card>
                <CardContent>
                  <form className="space-x-4 p-6" onSubmit={addCategories}>
                    <div class="mb-5">
                      <label
                        for="name"
                        class="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Categories Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.values)}
                        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="add categories..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="text-white bg-blue-500 inline-block hover:bg-blue-700 rounded-lg shadow-lg px-4 py-2"
                    >
                      Add!
                    </button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Link
                    to={"/category_data_admin"}
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
