import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Car } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot';

export const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const qMode = searchParams.get('mode');
    if (qMode === 'register' || qMode === 'login' || qMode === 'forgot') {
      setMode(qMode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'register') {
        await register({ email, password, firstName, lastName, mobile });
      } else {
        // Forgot password mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Password reset link sent to ' + email);
      }
      if (mode !== 'forgot') navigate('/dashboard');
    } catch (err) {
      alert('Authentication failed. Try user: johndoe, any password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 text-white rounded-xl flex items-center justify-center">
             <Car className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {mode === 'login' && 'Welcome back'}
            {mode === 'register' && 'Create an account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' && 'Sign in to access your dashboard'}
            {mode === 'register' && 'Join thousands of car enthusiasts'}
            {mode === 'forgot' && 'Enter your email to receive instructions'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="sr-only">First Name</label>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">Last Name</label>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="sr-only">Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
             {mode === 'login' && (
              <div className="text-sm">
                <button type="button" onClick={() => setMode('forgot')} className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </button>
              </div>
             )}
          </div>

          <div>
            <Button type="submit" className="w-full" isLoading={loading}>
              {mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
            </Button>
          </div>
          
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-600">Don't have an account? <button type="button" onClick={() => setMode('register')} className="font-bold text-primary-600">Sign up</button></p>
            ) : (
              <p className="text-gray-600">Already have an account? <button type="button" onClick={() => setMode('login')} className="font-bold text-primary-600">Sign in</button></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
