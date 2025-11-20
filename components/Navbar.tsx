import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Car, User as UserIcon, Menu, X, LogOut, PlusCircle, LayoutDashboard, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-600 text-white p-2 rounded-xl group-hover:bg-primary-700 transition-colors">
              <Car className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              AutoMarket<span className="text-primary-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Home</Link>
            <Link to="/listings" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Browse Cars</Link>
            <Link to="/sell" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Sell Car</Link>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                    {user.firstName ? user.firstName[0] : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.firstName || user.username}</p>
                    <p className="text-xs text-gray-500">My Account</p>
                  </div>
                </button>

                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 overflow-hidden">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link to="/dashboard?tab=favorites" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      <Heart className="h-4 w-4" /> Favorites
                    </Link>
                    <Link to="/sell" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      <PlusCircle className="h-4 w-4" /> Create Ad
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth?mode=login" className="text-gray-700 font-medium hover:text-primary-600">Log in</Link>
                <Link to="/auth?mode=register">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600">Home</Link>
            <Link to="/listings" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600">Browse Cars</Link>
            <Link to="/sell" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600">Sell Car</Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            {user ? (
              <>
                 <Link to="/dashboard" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Dashboard</Link>
                 <button onClick={handleLogout} className="w-full text-left block px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">Sign Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/auth?mode=login">
                  <Button variant="outline" className="w-full justify-center">Log in</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button variant="primary" className="w-full justify-center">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
