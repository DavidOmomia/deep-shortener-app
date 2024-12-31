import { getToken } from '../utils';
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

interface RequestOptions {
    method: string;
    headers?: Record<string, string>;
    body?: unknown;
}

const makeRequest = async (endpoint: string, options: RequestOptions) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  const response = await fetch(url, {
      method: options.method,
      headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors[0].detail || errorData.errors[0].title || "An error occurred.");
  }

  return await response.json();
};


export const signup = async (email: string, password: string) => {
    return makeRequest('/v1/users/signup', {
        method: 'POST',
        body: { email, password },
    });
};

export const login = async (email: string, password: string) => {
    return makeRequest('/v1/users/login', {
        method: 'POST',
        body: { email, password },
    });
};

export const shortenUrl = async (url: string, slug?: string) => {
  return makeRequest('/v1/urls/shorten', {
      method: 'POST',
      body: { url, ...(slug ? { slug } : {}) },
  });
};

export const redirectUrl = async (slug: string) => {
  return makeRequest(`/${slug}`, { method: 'GET' });
};

export const getUserUrls = async () => {
  return makeRequest(`/v1/urls`, { method: 'GET' });
};

export const modifySlug = async (slug: string, newSlug: string) => {
  return makeRequest(`/v1/urls/modify`, { 
    method: 'PUT',
    body: { slug, newSlug }
  });
}

export const deleteSlug = async (slug: string) => {
  return makeRequest(`/v1/urls/${ slug }`, {method: 'DELETE'});
}