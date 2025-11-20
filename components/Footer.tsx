import React from 'react';
import { Car, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">AutoMarket<span className="text-primary-500">Pro</span></span>
            </div>
            <p className="text-sm text-gray-400">
              The most trusted automotive marketplace. Buy and sell new and used cars with confidence.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Search Cars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sell Your Car</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find Dealers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Car Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} AutoMarket Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
