export enum CarCategory {
  SUV = 'SUV',
  Sedan = 'Sedan',
  Coupe = 'Coupe',
  Hatchback = 'Hatchback',
  Convertible = 'Convertible',
  Truck = 'Truck',
  Electric = 'Electric',
  Luxury = 'Luxury'
}

export enum FuelType {
  Petrol = 'Petrol',
  Diesel = 'Diesel',
  Electric = 'Electric',
  Hybrid = 'Hybrid'
}

export enum Transmission {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  avatarUrl?: string;
}

export interface Car {
  id: string;
  userId: string; // Seller
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  category: CarCategory;
  location: string;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  isFeatured?: boolean;
}

export interface FilterState {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  category?: CarCategory;
}
