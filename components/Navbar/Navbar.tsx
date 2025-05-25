'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Adjust path as necessary

const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Basic styling for the navbar
  const navStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e7e7e7',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333',
  };

  const linkStyle: React.CSSProperties = {
    marginLeft: '1rem',
    textDecoration: 'none',
    color: '#007bff',
  };

  const buttonStyle: React.CSSProperties = {
    marginLeft: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const userInfoStyle: React.CSSProperties = {
    marginRight: '1rem',
    color: '#555',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link href="/" style={logoStyle}>
          Edens
        </Link>
      </div>
      <div>
        {isLoading ? (
          <span style={userInfoStyle}>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            <span style={userInfoStyle}>
              Hello, {user.fullname || user.email || 'User'}
            </span>
            <button onClick={logout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={linkStyle}>
              Login
            </Link>
            <Link href="/signup" style={linkStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;