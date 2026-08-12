import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import NavbarCustomer from "../../../components/ui/navbarcustomer";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function CustomerPages() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bagCount, setBagCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likedBooks, setLikedBooks] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const toggleLiked = (title) => {
    setLikedBooks((current) =>
      current.includes(title)
        ? current.filter((book) => book !== title)
        : [...current, title],
    );
  };

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/customers/getBooksData",
      );

      setBooks(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);
  return (
    <>
      <NavbarCustomer />
      <main className="min-h-screen overflow-hidden bg-amber-200 text-ink">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-coral">
              <span className="h-px w-10 bg-coral" />
              An independent bookstore
            </div>
            <h1 className="font-display text-[clamp(3.7rem,9vw,7.7rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              Stories that <em className="text-coral">stay</em> with you.
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-7 text-ink/65 sm:text-lg">
              Thoughtfully chosen books for curious minds, slow mornings, and
              everywhere your imagination wants to go.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                onClick={() => scrollToId("shop")}
                className="group flex items-center gap-4 rounded-full text-white bg-blue-500 px-6 py-3.5 text-sm font-bold text-paper transition hover:bg-blue-700"
              >
                Find your next read
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20 transition group-hover:translate-x-1">
                  <ArrowUpRight size={16} />
                </span>
              </button>
              <button
                onClick={() => scrollToId("about")}
                className="group flex items-center gap-4 rounded-full text-white bg-blue-500 px-6 py-3.5 text-sm font-bold text-paper transition hover:bg-blue-700"
              >
                Why Bookstore?
              </button>
            </div>
            <div className="mt-12 flex items-center gap-4 text-xs font-semibold text-ink/55">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Paper Moon reader"
                    className="h-8 w-8 rounded-full border-2 border-paper object-cover"
                  />
                ))}
              </div>
              <span>
                <strong className="text-ink">2,000+</strong> happy readers and
                counting
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -right-3 top-3 h-full w-full rounded-[2rem] bg-sage/70 sm:-right-5 sm:top-5" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#dba881] p-3 sm:p-5">
              <div className="relative aspect-[.86] overflow-hidden rounded-[1.35rem]">
                <img
                  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=90"
                  alt="A reader enjoying a book by a sunny window"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper sm:bottom-8 sm:left-8 sm:right-8">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-paper/70">
                      This month&apos;s mood
                    </p>
                    <p className="font-display text-3xl italic sm:text-4xl">
                      Take your time.
                    </p>
                  </div>
                  <Sparkles className="mb-1 text-sun" size={28} />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-5 hidden rotate-[-8deg] rounded-xl bg-sun px-5 py-4 shadow-lg sm:block">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">
                Good books
              </p>
              <p className="font-display text-xl italic">good company</p>
            </div>
          </div>
        </section>

        <section
          id="shop"
          className="scroll-mt-8 border-y border-ink/10 bg-[#f0eadc] px-6 py-20 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-coral">
                  The good stuff
                </p>
                <h2 className="font-display text-5xl tracking-[-0.06em] sm:text-6xl">
                  Books worth <em>keeping.</em>
                </h2>
              </div>
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/45"
                  size={18}
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title or author"
                  className="w-full border-b border-ink/30 bg-transparent py-2 pl-7 pr-2 text-sm outline-none placeholder:text-ink/45 focus:border-coral"
                  aria-label="Search title or author"
                />
              </div>
            </div>

            {books.length > 0 ? (
              <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {books.slice(0, 4).map((book) => (
                  <article key={book.title} className="group">
                    <div
                      className={`relative aspect-[.78] overflow-hidden rounded-2xl ${book.color} p-5 sm:p-7`}
                    >
                      <img
                        src={`http://localhost:3000/images/${book.cover}`}
                        alt={`${book.title} book`}
                        className="h-full w-full rounded-lg object-cover shadow-[12px_14px_25px_rgba(42,37,32,0.22)] transition duration-500 group-hover:scale-105 group-hover:rotate-1"
                      />
                      <button
                        onClick={() => toggleLiked(book.title)}
                        className="absolute right-3 top-3 rounded-full bg-paper/90 p-2 transition hover:bg-paper"
                        aria-label={
                          likedBooks.includes(book.title)
                            ? `Remove ${book.title} from wishlist`
                            : `Add ${book.title} to wishlist`
                        }
                      ></button>
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
                      onClick={() => setBagCount((count) => count + 1)}
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
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All books");
                  }}
                  className="mt-3 text-sm font-bold text-coral underline underline-offset-4"
                >
                  Clear your search
                </button>
              </div>
            )}

            <div className="mt-14 flex justify-center">
              <Link
                to={"/shopbooks"}
                className="flex items-center gap-3 text-white rounded-full bg-blue-500 border border-ink/30 px-5 py-3 text-sm font-bold transition hover:border-ink hover:bg-blue-700"
              >
                View all books <ChevronDown size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="journal"
          className="scroll-mt-8 mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-10 lg:py-28"
        >
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[1.6rem] border border-coral/50 sm:-left-6 sm:-top-6" />
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=85"
              alt="Stack of books and a notebook"
              className="relative aspect-[.94] w-full rounded-[1.6rem] object-cover"
            />
            <div className="absolute -bottom-5 -right-5 rounded-full bg-coral px-5 py-4 text-center text-paper shadow-lg sm:-right-8">
              <Star className="mx-auto mb-1 fill-sun text-sun" size={15} />
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider">
                Since 2018
              </p>
            </div>
          </div>
          <div className="max-w-xl lg:pl-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-coral">
              From the journal
            </p>
            <h2 className="font-display text-5xl leading-[.94] tracking-[-0.06em] sm:text-6xl">
              A little more <em>wonder</em> in your week.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-ink/65">
              Notes from our booksellers, reading lists for every mood, and the
              occasional reminder that there&apos;s no such thing as reading too
              slowly.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 rounded-lg shadow-lg px-4 py-2 text-white group mt-8 flex items-center gap-3 border-b border-ink pb-2 text-sm font-bold">
              Read our latest notes{" "}
              <ArrowUpRight
                size={17}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-8 bg-white px-6 py-20 text-paper lg:px-10 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.85fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sun">
                The Paper Moon promise
              </p>
              <h2 className="max-w-3xl font-display text-5xl leading-[.94] tracking-[-0.06em] sm:text-7xl">
                More than a store. <em className="text-coral">A feeling.</em>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-paper/60">
              We believe the right book can change the shape of an afternoon, a
              year, or a life. Our shelves are small on purpose: every title has
              earned its place.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 sm:grid-cols-3">
            {[
              [
                "01",
                "Human curation",
                "No algorithms. Just booksellers who know and love their shelves.",
              ],
              [
                "02",
                "Small & independent",
                "Your purchase supports a local, thoughtful way of doing business.",
              ],
              [
                "03",
                "Always a good read",
                "Beautiful books, honest recommendations, and zero gatekeeping.",
              ],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-ink p-6 sm:p-8">
                <span className="font-mono text-xs text-sun">{number}</span>
                <h3 className="mt-10 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/55">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sun px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
                A note in your inbox
              </p>
              <h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">
                Stay curious with us.
              </h2>
            </div>
            {newsletterSubmitted ? (
              <p className="font-display text-2xl italic">
                You&apos;re on the list. Welcome in.
              </p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (newsletterEmail) setNewsletterSubmitted(true);
                }}
                className="flex w-full max-w-md border-b-2 border-ink/60 pb-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  required
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/60"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm font-bold"
                >
                  Subscribe <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </section>

        <footer className="bg-white px-6 pb-8 pt-12 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 sm:flex-row">
            <div>
              <Link to="/" className="font-display text-2xl tracking-[-0.05em]">
                Bookstore
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-6 text-ink/50">
                Independent books for independent minds. Find us wherever good
                stories are shared.
              </p>
            </div>
            <div className="flex gap-16 text-sm">
              <div>
                <p className="mb-4 font-bold">Explore</p>
                <button
                  onClick={() => scrollToId("shop")}
                  className="mb-2 block text-ink/55 hover:text-coral"
                >
                  Shop books
                </button>
                <button
                  onClick={() => scrollToId("journal")}
                  className="block text-ink/55 hover:text-coral"
                >
                  The journal
                </button>
              </div>
              <div>
                <p className="mb-4 font-bold">Follow along</p>
                <div className="flex gap-3">
                  <button
                    aria-label="Instagram"
                    className="font-display text-lg leading-none text-ink/55 hover:text-coral"
                  >
                    ◎
                  </button>
                  <button
                    aria-label="Twitter"
                    className="font-mono text-sm text-ink/55 hover:text-coral"
                  >
                    𝕏
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-7xl justify-between border-t border-ink/10 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
            <span>© 2026 Bookstore</span>
            <span>Made for slow readers</span>
          </div>
        </footer>
      </main>
    </>
  );
}
