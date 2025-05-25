
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <p style={{ fontSize: '1.2em' }}>Loading...</p>
      </div>
    );
  }

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      {isAuthenticated && user ? (
        <div>
          <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>
            Welcome, {user.fullname || user.email || 'User'}!
          </h1>
          <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
            You are successfully logged in.
          </p>
          {user.email && (
            <p style={{ fontSize: '1em', color: '#555', marginBottom: '20px' }}>
              Email: {user.email}
            </p>
          )}
          {/* You can add more user-specific content or navigation here */}
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: '1.8em', marginBottom: '20px' }}>
            Please login to continue.
          </h1>
          <p style={{ fontSize: '1.1em' }}>
            <Link href="/login" style={{ color: '#007bff', textDecoration: 'none', marginRight: '5px' }}>
              Login
            </Link>
            or
            <Link href="/signup" style={{ color: '#28a745', textDecoration: 'none', marginLeft: '5px' }}>
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </main>
  );
};

export default HomePage;
