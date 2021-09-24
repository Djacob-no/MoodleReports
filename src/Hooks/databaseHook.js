import { useState, useEffect } from 'react';
const baseUrl = 'https://koy5fd9psk.execute-api.us-east-1.amazonaws.com/dev/';


const usePosts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: {
          'Content-Type': ' application/json',
          'x-api-key': '7xWNHjPNRH4wJbicGu3Zu21ynVfrni5csEM8ibqh'
        }
      });
      const posts = await res.json();
      setData(posts);
    };
    fetchData();
  }, []);

  return { data };
};

export default usePosts