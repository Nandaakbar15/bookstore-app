import { useParams, Link } from "react-router-dom";
import NavbarCustomer from "../../../components/ui/navbarcustomer";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Package, BookOpen, Tag } from "lucide-react";

export default function DetailBooksPages() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/customers/detailBook/${id}`,
        );

        setBook(res.data.data);
      } catch (error) {
        console.error("Error : ", error);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookById();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavbarCustomer />
        <section className="min-h-screen bg-[#f0eadc] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <NavbarCustomer />
        <section className="min-h-screen bg-[#f0eadc] px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book not found
              </h2>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-ink transition"
              >
                <ArrowLeft size={16} />
                Back to Shop
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NavbarCustomer />
      <section className="min-h-screen bg-[#f0eadc] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Link
            to="/shopbooks"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
              {/* Book Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  {book.cover ? (
                    <img
                      src={`http://localhost:3000/images/${book.cover}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <BookOpen size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="flex flex-col justify-center space-y-6">
                {/* Title */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                    {book.title}
                  </h1>
                  <p className="text-xl text-gray-600">
                    by {book.author?.name || "Unknown Author"}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-coral">
                    Rp {book.price?.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
                  <div className="flex items-center gap-3">
                    <Package className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="font-semibold text-gray-900">
                        {book.stock || 0} available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">
                        {book.category?.name || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">ISBN</p>
                      <p className="font-semibold text-gray-900">
                        {book.isbn || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Publisher</p>
                      <p className="font-semibold text-gray-900">
                        {book.publisher?.name || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {book.description && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => alert("Add to cart feature coming soon!")}
                    disabled={!book.stock || book.stock === 0}
                    className="flex-1 bg-coral hover:bg-coral/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
                  >
                    <ShoppingCart size={20} />
                    {!book.stock || book.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>

                {/* Additional Info */}
                {book.stock > 0 && book.stock < 5 && (
                  <p className="text-sm text-orange-600 font-medium">
                    ⚠️ Only {book.stock} left in stock!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
