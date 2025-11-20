import React, { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockSupabase } from '../services/mockSupabase';
import { Car } from '../types';
import { CarCard } from '../components/CarCard';
import { Heart, List, User as UserIcon, Search } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  
  const [myListings, setMyListings] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<Car[]>([]);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab')!);
    }
  }, [searchParams]);

  useEffect(() => {
    // Mock data fetching
    const loadData = async () => {
      const all = await mockSupabase.cars.getAll();
      if (user) {
        // Assume for demo that we posted everything
        setMyListings(all.filter(c => c.userId === user.id));
        // Assume we favorited the first two
        setFavorites(all.slice(0, 2)); 
      }
    };
    loadData();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Saved Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
        );
      case 'listings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Listings</h2>
             {myListings.length === 0 ? (
              <p>You haven't listed any cars yet.</p>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map(car => <CarCard key={car.id} car={car} />)}
               </div>
             )}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <img src={user?.avatarUrl} className="h-16 w-16 rounded-full" alt="Profile" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}</h1>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-1">{myListings.length}</div>
                <div className="text-blue-900 font-medium">Active Listings</div>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <div className="text-4xl font-bold text-red-600 mb-1">{favorites.length}</div>
                <div className="text-red-900 font-medium">Favorites</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="text-4xl font-bold text-green-600 mb-1">12</div>
                <div className="text-green-900 font-medium">Messages</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button 
                onClick={() => { setActiveTab('overview'); setSearchParams({}); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <UserIcon className="h-4 w-4" /> Overview
              </button>
              <button 
                onClick={() => { setActiveTab('listings'); setSearchParams({ tab: 'listings' }); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'listings' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" /> My Listings
              </button>
              <button 
                onClick={() => { setActiveTab('favorites'); setSearchParams({ tab: 'favorites' }); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Heart className="h-4 w-4" /> Favorites
              </button>
              <button 
                 className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Search className="h-4 w-4" /> Saved Searches
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
};