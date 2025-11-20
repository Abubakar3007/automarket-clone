import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { MapPin, Fuel, Gauge, Calendar, Heart } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={car.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {car.isFeatured && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            FEATURED
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-semibold flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3" /> {car.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {car.title}
          </h3>
        </div>
        
        <div className="text-2xl font-bold text-primary-600 mb-4">
          {formatPrice(car.price)}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-500 border-t border-b border-gray-50 py-3">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100">
            <Gauge className="h-4 w-4 text-gray-400" />
            <span>{formatNumber(car.mileage)} mi</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100">
            <Fuel className="h-4 w-4 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{car.year}</span>
          </div>
        </div>

        <Link to={`/car/${car.id}`} className="mt-auto">
          <button className="w-full py-2.5 bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 font-medium rounded-lg transition-colors border border-gray-200 hover:border-primary-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
