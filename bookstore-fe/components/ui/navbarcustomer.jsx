import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

import axios from "axios";

export default function NavbarCustomer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ambil nama user yang tersimpan di localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  return (
    <div>
      <header className="relative z-20 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Paper Moon home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-paper">
              <BookOpen size={19} strokeWidth={2.5} />
            </span>
            <span className="font-display text-[22px] font-semibold tracking-[-0.04em]">
              Bookstore
            </span>
          </Link>

          <nav
            className="hidden items-center gap-9 text-sm font-semibold md:flex"
            aria-label="Main navigation"
          >
            <button onClick={() => scrollToId("shop")} className="nav-link">
              Shop books
            </button>
            <button onClick={() => scrollToId("journal")} className="nav-link">
              The journal
            </button>
            <button onClick={() => scrollToId("about")} className="nav-link">
              About us
            </button>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => scrollToId("shop")}
              className="rounded-full p-2.5 transition hover:bg-ink/5"
              aria-label="Search books"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>
            <button
              className="relative rounded-full p-2.5 transition hover:bg-ink/5"
              aria-label={`Shopping bag with ${bagCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {bagCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-paper">
                  {bagCount}
                </span>
              )}
            </button>

            {/* Tampilkan Nama jika sudah login, atau Tombol Sign In jika belum */}
            {username ? (
              <span className="font-semibold text-lg text-gray-800 ml-2">
                Hi, {username} 👋
              </span>
            ) : (
              <Link
                to={"/loginPages"}
                className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full p-2.5 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-ink/10 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5 text-sm font-semibold">
              <button
                onClick={() => {
                  scrollToId("shop");
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                Shop books
              </button>
              <button
                onClick={() => {
                  scrollToId("journal");
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                The journal
              </button>
              <button
                onClick={() => {
                  scrollToId("about");
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                About us
              </button>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
