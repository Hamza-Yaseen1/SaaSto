"use client";

import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [user, setUser] = useState<User | null>(null); // Firebase user
  const [profileMenu, setProfileMenu] = useState(false); // Profile dropdown

  const navLinks = [
    { name: "Home", href: "/", hasDropdown: true },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Blog", href: "/blog", hasDropdown: true },
    { name: "Contact us", href: "/contact" },
  ];

  // Detect Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    setProfileMenu(false);
  };

  return (
    <nav className="w-full bg-white px-6 py-4 md:px-12 lg:px-24 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-2xl font-bold text-slate-900">SaaSto</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </div>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center gap-6 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {user.displayName
                      ? user.displayName[0].toUpperCase()
                      : user.email?.[0].toUpperCase()}
                  </div>
                )}
                <span className="font-medium text-slate-700">
                  {user.displayName || user.email}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border py-2">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
                    onClick={() => setProfileMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-700 font-medium hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border-2 border-indigo-100 text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl z-50 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-700 border-b border-slate-50 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 mt-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-center py-3 font-semibold text-slate-700 bg-indigo-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-center py-3 bg-red-500 text-white rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-center py-3 font-semibold text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center py-3 bg-indigo-600 text-white rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
