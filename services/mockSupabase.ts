import { Car, CarCategory, FuelType, Transmission, User } from '../types';

// Mock Data
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '+1 555 0199',
    avatarUrl: 'https://picsum.photos/id/64/200/200'
  }
];

const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    userId: 'u1',
    title: '2023 Tesla Model Y Long Range',
    brand: 'Tesla',
    model: 'Model Y',
    year: 2023,
    price: 48000,
    mileage: 12000,
    fuelType: FuelType.Electric,
    transmission: Transmission.Automatic,
    category: CarCategory.SUV,
    location: 'Los Angeles, CA',
    description: 'Pristine condition Tesla Model Y. Single owner, always garaged. Includes Full Self-Driving capability.',
    features: ['Autopilot', 'Heated Seats', 'Panoramic Roof', 'Navigation', 'Bluetooth'],
    images: [
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1600'
    ],
    createdAt: '2023-10-15T10:00:00Z',
    isFeatured: true
  },
  {
    id: 'c2',
    userId: 'u2',
    title: '2020 BMW M4 Competition',
    brand: 'BMW',
    model: 'M4',
    year: 2020,
    price: 62000,
    mileage: 25000,
    fuelType: FuelType.Petrol,
    transmission: Transmission.Automatic,
    category: CarCategory.Coupe,
    location: 'Miami, FL',
    description: 'A beast on the road. M Competition package with carbon fiber roof and interior trim.',
    features: ['Leather Seats', 'Harman Kardon Sound', 'Head-up Display', 'Carbon Fiber Package'],
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1555215696-99ac45e43d34?auto=format&fit=crop&q=80&w=1600'
    ],
    createdAt: '2023-11-01T14:30:00Z',
    isFeatured: true
  },
  {
    id: 'c3',
    userId: 'u1',
    title: '2022 Ford Bronco Wildtrak',
    brand: 'Ford',
    model: 'Bronco',
    year: 2022,
    price: 55000,
    mileage: 8000,
    fuelType: FuelType.Petrol,
    transmission: Transmission.Automatic,
    category: CarCategory.SUV,
    location: 'Denver, CO',
    description: 'Ready for off-road adventures. Sasquatch package included.',
    features: ['4x4', 'Removable Roof', 'Apple CarPlay', 'Tow Package'],
    images: [
      'https://images.unsplash.com/photo-1652533748637-7c1e4b53f366?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1600'
    ],
    createdAt: '2023-11-05T09:00:00Z'
  },
  {
    id: 'c4',
    userId: 'u3',
    title: '2021 Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    model: 'C300',
    year: 2021,
    price: 42000,
    mileage: 18000,
    fuelType: FuelType.Hybrid,
    transmission: Transmission.Automatic,
    category: CarCategory.Sedan,
    location: 'New York, NY',
    description: 'Luxury daily driver with excellent fuel economy.',
    features: ['Sunroof', 'Burmester Audio', 'Ambient Lighting', 'Keyless Go'],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1600'
    ],
    createdAt: '2023-11-08T11:20:00Z'
  },
  {
    id: 'c5',
    userId: 'u3',
    title: '2019 Porsche 911 Carrera S',
    brand: 'Porsche',
    model: '911',
    year: 2019,
    price: 115000,
    mileage: 12000,
    fuelType: FuelType.Petrol,
    transmission: Transmission.Automatic,
    category: CarCategory.Coupe,
    location: 'Los Angeles, CA',
    description: 'Timeless design and performance. Sport Chrono package.',
    features: ['Sport Exhaust', 'Bose Sound', '18-way Seats', 'PDLS+'],
    images: [
      'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1600'
    ],
    createdAt: '2023-11-10T16:45:00Z',
    isFeatured: true
  }
];

// Service
export const mockSupabase = {
  auth: {
    getUser: async () => {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_USERS[0]; // Default logged in user for demo
    },
    signIn: async (email: string) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (email === 'error@test.com') throw new Error('Invalid credentials');
      return MOCK_USERS[0];
    },
    signOut: async () => {
      return null;
    }
  },
  cars: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return [...MOCK_CARS];
    },
    getById: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return MOCK_CARS.find(c => c.id === id) || null;
    },
    getFeatured: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return MOCK_CARS.filter(c => c.isFeatured);
    },
    create: async (car: Omit<Car, 'id' | 'createdAt'>) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCar: Car = {
        ...car,
        id: `c${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      MOCK_CARS.push(newCar);
      return newCar;
    }
  }
};
