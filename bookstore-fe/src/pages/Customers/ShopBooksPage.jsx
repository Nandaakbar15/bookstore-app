import axios from "axios";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarCustomer from "../../../components/ui/navbarcustomer";

export default function ShopBooksPages() {
  const [books, setBooks] = useState([]);
  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [search, setSearch] = useState("");

  const fetchBooksData = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/customers/getBooksData?page=${page}`,
      );

      setBooks(res.data.data);

      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchBooksData();
  }, []);
  return (
    <>
      <NavbarCustomer />
      <section
        id="shop"
        className="scroll-mt-8 border-y border-ink/10 bg-[#f0eadc] px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/45"
                size={18}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title or author"
                className="w-full border-b border-ink/30 rounded-lg px-4 bg-transparent py-3 pl-7 pr-2 text-sm outline-none placeholder:text-ink/45 focus:border-coral"
                aria-label="Search title or author"
              />
            </div>
          </div>

          {books.length > 0 ? (
            <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <article key={book.title} className="group">
                  <div
                    className={`relative aspect-[.78] overflow-hidden rounded-2xl ${book.color} p-5 sm:p-7`}
                  >
                    <Link to={`/detailBooks/${book.id}`}>
                      <img
                        src={`http://localhost:3000/images/${book.cover}`}
                        alt={`${book.title} book`}
                        className="h-full w-full rounded-lg object-cover shadow-[12px_14px_25px_rgba(42,37,32,0.22)] transition duration-500 group-hover:scale-105 group-hover:rotate-1"
                      />
                    </Link>
                  </div>
                  <div className="flex items-start justify-between gap-3 pt-4">
                    <div>
                      <h3 className="font-display text-[21px] leading-tight tracking-[-0.035em]">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/55">
                        {book.author.name}
                      </p>
                    </div>
                    <span className="pt-1 text-sm font-bold">
                      Rp. {book.price}
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Add to cart feature coming soon!")}
                    className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-coral transition hover:text-ink"
                  >
                    Add to bag{" "}
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-ink/25 py-16 text-center">
              <p className="font-display text-3xl">No books found.</p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm font-bold text-coral underline underline-offset-4"
              >
                Clear your search
              </button>
            </div>
          )}

          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={paginations.current_page === 1}
              onClick={() => fetchBooksData(paginations.current_page - 1)}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Pages {paginations.current_page} from {paginations.last_page}
            </span>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={paginations.current_page === paginations.last_page}
              onClick={() => fetchBooksData(paginations.current_page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
