import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import * as Utils from '../utils';
import * as API from "../services/api";
import { useNavigate } from 'react-router-dom';

interface UrlData {
  id: string;
  slug: string;
  url: string;
  userId: number;
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

const API_URL = import.meta.env.VITE_API_BASE_URL

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [urlList, setUrlList] = useState<UrlData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isShortened, setIsShortened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<UrlData | null>(null);
  const [newSlug, setNewSlug] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await API.getUserUrls();
        setUrlList(response.data);
      } catch (error) {
        Utils.handleAPIError(error);
      }
    };

    fetchUrls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    Utils.showSuccessToast('Logged out successfully!');
  };

  const filteredUrls = urlList.filter((url) =>
    url.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShorten = async () => {
    if (!newUrl.trim()) {
      setIsValidUrl(false);
      return;
    }

    if (!Utils.isValidUrl(newUrl)) {
      setIsValidUrl(false);
      setIsShortened(false);
      return;
    }

    try {
      const response = await API.shortenUrl(newUrl, customSlug || undefined);
      setShortenedUrl(`${API_URL}/${response.data.slug}`);
      setIsShortened(true);
      setIsValidUrl(true);
      setUrlList([response.data, ...urlList]);
      Utils.showSuccessToast('URL shortened successfully!');
    } catch (error) {
      Utils.handleAPIError(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openModal = () => {
    setNewUrl('');
    setCustomSlug('');
    setShortenedUrl('');
    setIsShortened(false);
    setIsValidUrl(true);
    setIsModalOpen(true);
  };

  const openEditModal = (url: UrlData) => {
    setSelectedUrl(url);
    setNewSlug(url.slug);
    setIsModalOpen(true);
  };

  const handleEditSlug = async () => {
    if (!newSlug.trim() || !selectedUrl) {
      return;
    }

    try {
      await API.modifySlug(selectedUrl.slug, newSlug);
      Utils.showSuccessToast('Slug updated successfully!');
      setTimeout(() => {
        navigate(0);
      }, 1200);
    } catch (error) {
      Utils.handleAPIError(error);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await API.deleteSlug(slug);
      const updatedUrls = urlList.filter((url) => url.slug !== slug);
      Utils.showSuccessToast('URL deleted successfully!');
      setUrlList(updatedUrls);
    } catch (error) {
      Utils.handleAPIError(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUrl(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">URL Shortener</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={openModal}
              className="bg-[#6D2EB1] text-white py-2 px-6 rounded-lg shadow hover:bg-opacity-90 transition duration-300"
            >
              Shorten URL
            </button>
            <button
              onClick={handleLogout}
              className="bg-white border border-[#6D2EB1] text-[#6D2EB1] py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mb-6 flex justify-start">
          <Input
            type="text"
            placeholder="Search URLs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            color="bg-white"
            focusColor="focus:ring-[#6D2EB1]"
            className="w-1/4"
          />
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shortened URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUrls.map((url) => (
                <tr key={url.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">
                    {url.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <a
                      href={`${API_URL}/${url?.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition duration-300"
                    >
                      {`${API_URL}/${url?.slug}`}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {url.visits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                    <button
                      onClick={() => openEditModal(url)}
                      className="bg-white border border-[#6D2EB1] text-[#6D2EB1] py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
                    >
                      Edit Slug
                    </button>
                    <button
                      onClick={() => handleDelete(url.slug)}
                      className="bg-white border border-red-500 text-red-500 py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            {selectedUrl ? (
              <>
                <h2 className="text-2xl text-black font-bold mb-4">Edit Slug</h2>
                <p className="mb-4 text-black">Edit the slug for: <span className="text-[#6D2EB1]">{selectedUrl.url}</span></p>
                <Input
                  type="text"
                  placeholder="Enter new slug"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  size="medium"
                  color="bg-white"
                  focusColor="focus:ring-[#6D2EB1]"
                  className="w-full mb-4"
                />
                <Button text="Save" color="#6D2EB1" size="medium" onClick={handleEditSlug} className="w-1/3 mb-4" />
              </>
            ) : (
              <>
                <h2 className="text-2xl text-black font-bold mb-4">URL Shortener</h2>
                <p className="mb-4 text-black">Enter the URL to shorten</p>
                <Input
                  type="text"
                  placeholder="Enter long link here"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  size="medium"
                  color="bg-white"
                  focusColor="focus:ring-[#6D2EB1]"
                  className="w-full mb-4"
                />
                <p className="mb-4 text-black">Customize your link</p>
                <div className="flex space-x-4 mb-4">
                  <Input
                    type="text"
                    placeholder= {API_URL}
                    value= {API_URL}
                    readOnly
                    onChange={() => {}}
                    size="medium"
                    color="bg-gray-100"
                    focusColor="focus:ring-[#6D2EB1]"
                    className="w-3/5"
                  />
                  <Input
                    type="text"
                    placeholder="slug (optional)"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    size="medium"
                    color="bg-white"
                    focusColor="focus:ring-[#6D2EB1]"
                    className="w-2/5"
                  />
                </div>
                <Button text="Shorten" color="#6D2EB1" size="medium" onClick={handleShorten} className="w-1/3 mb-4" />
                {isShortened && (
                  <div className="mt-4">
                    <p className="text-green-600 mb-2">Success! Here's your short URL:</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{shortenedUrl}</span>
                      <button
                        onClick={handleCopy}
                        className="bg-white border border-[#6D2EB1] text-[#6D2EB1] py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8m-8-4h8m-6 8h6m-6-4h6m-6-4h6M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                        </svg>
                        Copy
                      </button>
                    </div>
                    {isCopied && (
                      <p className="text-green-600 mt-2 animate-pulse">Copied to clipboard!</p>
                    )}
                  </div>
                )}
                {!isValidUrl && (
                  <div className="mt-4">
                    <p className="text-red-600 mb-2">This is not a valid URL. Please check the URL and try again.</p>
                  </div>
                )}
              </>
            )}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-transparent border-none focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;