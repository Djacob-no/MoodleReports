import { useState, useEffect } from 'react';
import USE_LOCAL_DATA from './localConfig';

// Import local test data
import localAttempts from './testAttempts.json';
import localGrades from './testGrades.json';

// Try to import API key, but allow fallback for local development
let apiKey;
try {
  apiKey = require('./apiKey').default;
} catch (e) {
  apiKey = process.env.REACT_APP_MOODLE_API_KEY;
  if (!apiKey && !USE_LOCAL_DATA) {
    console.error('Missing API key. Set REACT_APP_MOODLE_API_KEY or create src/Hooks/apiKey.js, or set REACT_APP_USE_LOCAL_DATA=true for offline development');
  }
}

const baseUrl = 'https://qmkovgsrs9.execute-api.us-east-1.amazonaws.com/prod';
const basegrades ='https://qmkovgsrs9.execute-api.us-east-1.amazonaws.com/prod/grades';


export const useAttempts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    if (USE_LOCAL_DATA) {
      // Use local test data
      console.log('Using local test data for attempts');
      setData(localAttempts);
      return;
    }

    // Use remote API
    const fetchData = async () => {
      if (!apiKey) {
        console.error('No API key available for remote data fetch');
        return;
      }
      
      try {
        const res = await fetch(baseUrl, {
          method: "GET",
          headers: {
            'Content-Type': ' application/json',
            'x-api-key': apiKey
          }
        });
        const attempts = await res.json();
        setData(attempts);
      } catch (error) {
        console.error('Failed to fetch attempts:', error);
        // Fallback to local data if API fails
        console.log('Falling back to local test data');
        setData(localAttempts);
      }
    };
    fetchData();
  }, []);

  //console.log("raw db hook lenght = "+data.length);
  return { data };
};


export const useGrades = () => {
  const [data, setData] = useState();

  useEffect(() => {
    if (USE_LOCAL_DATA) {
      // Use local test data
      console.log('Using local test data for grades');
      setData(localGrades);
      return;
    }

    // Use remote API
    const fetchData = async () => {
      if (!apiKey) {
        console.error('No API key available for remote data fetch');
        return;
      }

      try {
        const res = await fetch(basegrades, {
          method: "GET",
          headers: {
            'Content-Type': ' application/json',
            'x-api-key': apiKey
          }
        });
        const posts = await res.json();
        setData(posts);
      } catch (error) {
        console.error('Failed to fetch grades:', error);
        // Fallback to local data if API fails
        console.log('Falling back to local test data');
        setData(localGrades);
      }
    };
    fetchData();
  }, []);

  //console.log("raw db hook lenght = "+data.length);
  return { data };
};

