import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { CarCategory, FuelType, Transmission } from '../types';
import { mockSupabase } from '../services/mockSupabase';
import { Upload, X } from 'lucide-react';

export const SellCar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    location: '',
    description: '',
    category: CarCategory.Sedan,
    fuelType: FuelType.Petrol,
    transmission: Transmission.Automatic,
  });

  // Handle Image "Upload" (Preview only for frontend demo)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to sell a car");
      navigate('/auth');
      return;
    }
    setLoading(true);
    try {
      // Simulate API Call / Webhook
      const payload = {
        ...formData,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        features: ['Standard Features'], // Simplified for demo
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1600'],
        userId: user.id,
      };

      console.log("Sending payload to api/listing/car", payload);
      await mockSupabase.cars.create(payload);
      
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sell Your Car</h1>
            <p className="text-gray-500">Fill in the details to list your vehicle on the marketplace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  placeholder="e.g. 2020 BMW M4 Competition"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input 
                  type="text" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input 
                  type="text" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input 
                  type="number" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as CarCategory})}
                >
                  {Object.values(CarCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                <input 
                  type="number" 
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.mileage}
                  onChange={e => setFormData({...formData, mileage: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select 
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.fuelType}
                  onChange={e => setFormData({...formData, fuelType: e.target.value as FuelType})}
                >
                  {Object.values(FuelType).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <select 
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.transmission}
                  onChange={e => setFormData({...formData, transmission: e.target.value as Transmission})}
                >
                  {Object.values(Transmission).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Details */}
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="City, State"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea 
                  rows={4}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border p-2"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                <input 
                  type="file" 
                  id="images" 
                  multiple 
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload photos</span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</span>
                </label>
              </div>
              
              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg" isLoading={loading}>
                Publish Listing
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
