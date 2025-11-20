import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CarCard } from '../components/CarCard';
import { mockSupabase } from '../services/mockSupabase';
import { Car, CarCategory } from '../types';
import { Search, ArrowRight, ShieldCheck, Zap, Clock, Car as CarIcon } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [searchParams, setSearchParams] = useState({ brand: '', model: '', maxPrice: '' });

  useEffect(() => {
    const loadFeatured = async () => {
      const cars = await mockSupabase.cars.getFeatured();
      setFeaturedCars(cars);
    };
    loadFeatured();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.brand) params.append('brand', searchParams.brand);
    if (searchParams.model) params.append('model', searchParams.model);
    if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Find Your Dream Car <br className="hidden md:block" />
            <span className="text-primary-500">Without The Hassle</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Search thousands of new and used cars from trusted dealers and private sellers.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto transform translate-y-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Make</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
                  value={searchParams.brand}
                  onChange={(e) => setSearchParams({...searchParams, brand: e.target.value})}
                >
                  <option value="">All Makes</option>
                  <option value="Tesla">Tesla</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Ford">Ford</option>
                  <option value="Porsche">Porsche</option>
                </select>
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Model</label>
                <input 
                  type="text" 
                  placeholder="Any Model"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                  value={searchParams.model}
                  onChange={(e) => setSearchParams({...searchParams, model: e.target.value})}
                />
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Max Price</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
                  value={searchParams.maxPrice}
                  onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
                >
                  <option value="">No Limit</option>
                  <option value="30000">$30,000</option>
                  <option value="50000">$50,000</option>
                  <option value="80000">$80,000</option>
                  <option value="100000">$100,000+</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full h-[46px] gap-2">
                  <Search className="h-5 w-5" /> Search Cars
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Browse by Type</h2>
              <p className="text-gray-500 mt-2">Find the perfect body style for your lifestyle</p>
            </div>
            <a href="/listings" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[CarCategory.SUV, CarCategory.Sedan, CarCategory.Coupe, CarCategory.Truck, CarCategory.Electric, CarCategory.Luxury].map((cat) => (
              <div key={cat} 
                onClick={() => navigate(`/listings?category=${cat}`)}
                className="group cursor-pointer bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-100 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300"
              >
                <div className="w-16 h-10 bg-gray-200 group-hover:bg-primary-200 rounded-lg mb-3 flex items-center justify-center transition-colors">
                  <CarIcon className="h-6 w-6 text-gray-500 group-hover:text-primary-600" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-primary-700">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Stats */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700">
            <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Dealers</h3>
            <p className="text-gray-400">Every dealer is vetted to ensure safe and secure transactions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700">
            <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Offers</h3>
            <p className="text-gray-400">Get real offers for your car in minutes, not days.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700">
            <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Process</h3>
            <p className="text-gray-400">Book test drives and complete paperwork online.</p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Arrivals</h2>
            <p className="text-gray-500 mt-2">Fresh inventory added daily</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sell */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Want to sell your car?</h2>
            <p className="text-primary-100 text-lg">Get the best value for your vehicle with our instant listing tool.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg" onClick={() => navigate('/sell')}>
              List for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};