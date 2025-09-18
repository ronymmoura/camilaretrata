import axios from "axios";

// Use relative URLs so it works in all environments
export const api = axios.create({
  baseURL: typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
