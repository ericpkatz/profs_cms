import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
const root = createRoot(document.querySelector('#root'));

const App = ()=> {
  const [content, setContent] = useState([]);
  useEffect(()=> {
    const fetchContent = async()=> {
      const response = await axios.get('/api/content');
      setContent(response.data);
    };
    fetchContent();
  }, []);
  return (
    <div>
      <h1>Profs CMS ({ content.length })</h1>
      <ul>
        {
          content.map( item => {
            return (
              <li key={ item.id }>
                { item.title }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

root.render(<App />);
