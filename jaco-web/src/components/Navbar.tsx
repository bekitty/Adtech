import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, User, Download, X } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-jaco-dark/95 backdrop-blur-sm border-b border-jaco-muted">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-jaco-hover rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-jaco-primary to-jaco-pink rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="text-gradient">Jaco</span>
              <span className="text-white">.live</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-jaco-hover text-white'
                    : 'text-gray-400 hover:text-white hover:bg-jaco-hover/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div
            className={`flex items-center w-full bg-jaco-card rounded-full border transition-all duration-200 ${
              searchFocused
                ? 'border-jaco-primary ring-2 ring-jaco-primary/20'
                : 'border-jaco-muted'
            }`}
          >
            <div className="flex items-center px-4 py-2 flex-1">
              <Search
                className={`w-4 h-4 mr-2 transition-colors ${
                  searchFocused ? 'text-jaco-primary' : 'text-gray-500'
                }`}
              />
              <input
                type="text"
                placeholder="Search streams, channels, categories..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue('')}
                  className="p-1 hover:bg-jaco-hover rounded-full"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button className="p-2 hover:bg-jaco-hover rounded-lg transition-colors sm:hidden">
            <Search className="w-5 h-5" />
          </button>

          {/* Download App Button */}
          <button className="hidden xl:flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-jaco-hover rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Get App</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-jaco-hover rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>

          {/* User Icon - Mobile */}
          <button className="p-2 hover:bg-jaco-hover rounded-lg transition-colors md:hidden">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
