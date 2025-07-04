import React, { useContext } from 'react';
import axios from 'axios';
import { BusinessContext } from './context/BusinessContext.jsx';
import './index.css';

function App() {
  const { formData, setFormData, businessData, setBusinessData, isLoading, setIsLoading } = useContext(BusinessContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) {
      alert('Please fill in both Business Name and Location');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('https://growth-pro-ai-kappa.vercel.app/business-data', formData);
      setBusinessData(response.data);
    } catch (error) {
      console.error('Error fetching business data:', error);
      alert('Failed to fetch business data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://growth-pro-ai-kappa.vercel.app/regenerate-headline', {
        params: formData,
      });
      setBusinessData({ ...businessData, headline: response.data.headline });
    } catch (error) {
      console.error('Error regenerating headline:', error);
      alert('Failed to regenerate headline');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">GrowthProAI Dashboard</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formData.name.trim() === '' ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Cake & Co"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formData.location.trim() === '' ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Mumbai"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}
      {businessData && (
        <div className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Business Data</h2>
          <p><strong>Rating:</strong> {businessData.rating} ★</p>
          <p><strong>Reviews:</strong> {businessData.reviews}</p>
          <p><strong>SEO Headline:</strong> {businessData.headline}</p>
          <button
            onClick={handleRegenerate}
            className="mt-4 bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Regenerating...' : 'Regenerate SEO Headline'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
