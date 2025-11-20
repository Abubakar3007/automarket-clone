import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CarCard } from '../components/CarCard';
import { Button } from '../components/Button';
import { mockSupabase } from '../services/mockSupabase';
import { Car, CarCategory } from '../types';
import { Filter, X } from 'lucide-react';

export const Listings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter States
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || '',
    minPrice: '',
    maxPrice: searchParams.get('maxPrice') || '',
    category: searchParams.get('category') || '',
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const allCars = await mockSupabase.cars.getAll();
      
      // Client-side filtering since we are mocking
      const filtered = allCars.filter(car => {
        if (filters.brand && !car.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
        if (filters.category && car.category !== filters.category) return false;
        if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
        return true;
      });

      setCars(filtered);
      setLoading(false);
    };
    fetchCars();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Cars for Sale</h1>
          <button 
            className="md:hidden flex items-center gap-2 text-gray-600"
            onClick={() => setShowMobileFilter(true)}
          >
            <Filter className="h-5 w-5" /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className={`
            fixed inset-0 z-40 bg-black bg-opacity-50 md:static md:bg-transparent md:inset-auto md:z-auto md:block
            ${showMobileFilter ? 'block' : 'hidden'}
          `}>
            <div className={`
              absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl transform transition-transform duration-300
              md:static md:w-auto md:h-auto md:shadow-none md:transform-none md:bg-transparent md:p-0
              ${showMobileFilter ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilter(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Filter Groups */}
              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Make</label>
                  <select 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 p-2 border"
                    value={filters.brand}
                    onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  >
                    <option value="">All Makes</option>
                    <option value="Tesla">Tesla</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Ford">Ford</option>
                    <option value="Porsche">Porsche</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Price Range</label>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-1/2 border-gray-300 rounded-lg shadow-sm p-2 border"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-1/2 border-gray-300 rounded-lg shadow-sm p-2 border"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Body Style</label>
                  <div className="space-y-2">
                    {Object.values(CarCategory).map(cat => (
                      <label key={cat} className="flex items-center">
                        <input 
                          type="radio" 
                          name="category" 
                          className="text-primary-600 focus:ring-primary-500 border-gray-300"
                          checked={filters.category === cat}
                          onChange={() => setFilters({...filters, category: cat})}
                        />
                        <span className="ml-2 text-gray-600 text-sm">{cat}</span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="category" 
                        className="text-primary-600 focus:ring-primary-500 border-gray-300"
                        checked={filters.category === ''}
                        onChange={() => setFilters({...filters, category: ''})}
                      />
                      <span className="ml-2 text-gray-600 text-sm">Any</span>
                    </label>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({ brand: '', minPrice: '', maxPrice: '', category: '' })}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse shadow-sm"></div>
                ))}
              </div>
            ) : cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <h3 className="text-xl font-medium text-gray-900">No cars found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
