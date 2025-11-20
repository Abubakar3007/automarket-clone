import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSupabase } from '../services/mockSupabase';
import { Car, CarCategory } from '../types';
import { Button } from '../components/Button';
import { CarCard } from '../components/CarCard';
import { 
  MapPin, Calendar, Gauge, Fuel, Settings, Shield, 
  Share2, Heart, Phone, MessageCircle, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      setLoading(true);
      const data = await mockSupabase.cars.getById(id);
      if (data) {
        setCar(data);
        // Mock related cars
        const all = await mockSupabase.cars.getAll();
        setRelatedCars(all.filter(c => c.category === data.category && c.id !== data.id).slice(0, 3));
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center">Car not found</div>;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };
  
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Gallery Lightbox Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center">
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-50"
            onClick={() => setIsGalleryOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center px-12">
             <button onClick={prevImage} className="absolute left-4 text-white hover:bg-white/10 p-2 rounded-full">
               <ChevronLeft className="h-10 w-10" />
             </button>
             <img 
              src={car.images[activeImageIndex]} 
              alt="Gallery View" 
              className="max-h-full max-w-full object-contain"
             />
             <button onClick={nextImage} className="absolute right-4 text-white hover:bg-white/10 p-2 rounded-full">
               <ChevronRight className="h-10 w-10" />
             </button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-screen-lg px-4">
            {car.images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                className={`h-16 w-24 object-cover cursor-pointer border-2 ${idx === activeImageIndex ? 'border-primary-500' : 'border-transparent opacity-60'}`}
                onClick={() => setActiveImageIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
          <span onClick={() => navigate('/')} className="cursor-pointer hover:text-primary-600">Home</span> / 
          <span onClick={() => navigate('/listings')} className="cursor-pointer hover:text-primary-600 ml-1">Listings</span> / 
          <span className="text-gray-900 font-medium ml-1">{car.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Gallery Component */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative aspect-[16/9] group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img 
                  src={car.images[activeImageIndex]} 
                  alt={car.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity">
                    View Gallery
                  </span>
                </div>
                {/* Arrows for inline nav */}
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 flex gap-4 overflow-x-auto">
                {car.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${idx === activeImageIndex ? 'border-primary-600' : 'border-transparent'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Overview & Features */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Gauge className="h-4 w-4"/> Mileage</span>
                  <span className="font-semibold">{car.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Fuel className="h-4 w-4"/> Fuel Type</span>
                  <span className="font-semibold">{car.fuelType}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Settings className="h-4 w-4"/> Transmission</span>
                  <span className="font-semibold">{car.transmission}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Calendar className="h-4 w-4"/> Year</span>
                  <span className="font-semibold">{car.year}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {car.description}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <Shield className="h-4 w-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Price & Seller */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{car.title}</h1>
                <p className="flex items-center text-gray-500 gap-1">
                  <MapPin className="h-4 w-4" /> {car.location}
                </p>
              </div>

              <div className="text-3xl font-bold text-primary-600 mb-6">
                ${car.price.toLocaleString()}
              </div>

              <div className="space-y-3 mb-8">
                <Button className="w-full h-12 text-lg gap-2">
                  <MessageCircle className="h-5 w-5" /> Contact Seller
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg gap-2">
                  <Phone className="h-5 w-5" /> Show Number
                </Button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://picsum.photos/id/64/100/100" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900">John's Premium Cars</p>
                    <p className="text-xs text-gray-500">Verified Dealer • Active since 2018</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                     <Heart className="h-4 w-4" /> Save
                  </button>
                  <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                     <Share2 className="h-4 w-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCars.map(c => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
