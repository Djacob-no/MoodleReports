import { useState, useEffect } from 'react';
import apiKey from './apiKey';
const baseUrl = 'https://koy5fd9psk.execute-api.us-east-1.amazonaws.com/dev/';
const basegrades ='https://koy5fd9psk.execute-api.us-east-1.amazonaws.com/dev/grades';


export const useAttempts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: {
          'Content-Type': ' application/json',
          'x-api-key': apiKey
        }
      });
      const attempts = await res.json();
      setData(attempts);
    };
    fetchData();
  }, []);

  //console.log("raw db hook lenght = "+data.length);
  return { data };
};


export const useGrades = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(basegrades, {
        method: "GET",
        headers: {
          'Content-Type': ' application/json',
          'x-api-key': apiKey
        }
      });
      const posts = await res.json();
      setData(posts);
    };
    fetchData();
  }, []);

  //console.log("raw db hook lenght = "+data.length);
  return { data };
};

