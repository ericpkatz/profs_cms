import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Link, HashRouter, Routes, Route, useParams } from 'react-router-dom';
const root = createRoot(document.querySelector('#root'));

const Content = ({ content })=> {
  const { id } = useParams();
  const item = content.find( item => item.id === id*1);
  if(!item){
    return null;
  }
  return (
    <div>
      <h2>{ item.name }</h2>
      <p>
        { item.description }
      </p>
    </div>

  );
};

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
      <h1><Link to='/'>Profs CMS ({ content.length })</Link></h1>
      <ul>
        {
          content.map( item => {
            return (
              <li key={ item.id }>
                <Link to={`/content/${item.id}`}> 
                { item.title }
                </Link>
              </li>
            );
          })
        }
      </ul>
      <Routes>
        <Route path='/content/:id' element={ <Content content={ content }/> } />
      </Routes>
    </div>
  );
};

root.render(<HashRouter><App /></HashRouter>);
