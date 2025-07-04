// src/context/BusinessContext.jsx
import React, { createContext, useState } from 'react';

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BusinessContext.Provider value={{ formData, setFormData, businessData, setBusinessData, isLoading, setIsLoading }}>
      {children}
    </BusinessContext.Provider>
  );
};

