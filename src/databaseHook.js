import {useState, useEffect} from 'react';
const baseUrl = 'https://jsonplaceholder.typicode.com';


const usePosts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}/posts`);
      const posts = await res.json();
      setData(posts);
    };
    fetchData();
  }, []);

  return { data };
};

export default usePosts