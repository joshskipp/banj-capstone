import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    })
  }, []);

  return (
    <>
      <div class="wrapper">
        <header class="header">
          <nav class="prenav">
            <a href="#">qld.gov.au</a>
            <div class="pre-heading">Support</div>
          </nav>
          <div class="banner">
            Prospector
          </div>
        </header>
        <div class="nav-1">
          <a href='#'>Link 1</a>
          <a href='#'>Link 2</a>
        </div>
        <article class="main">
          <p>main stuff</p>
          <h1>Welcome!</h1>
      <p>Lang again one more time</p>
      <p><strong>List of Posts</strong></p>
      {listOfPosts.map( (value, key) => {
        return <div className="post">
          <div className="title">{value.title}</div>
          <div className="body">
            {value.postText}
          </div>
          <div className="footer">{value.username}</div>
          </div>
      })}
        </article>
        
        <aside class="aside aside-left">Aside 1</aside>
        
        <footer class="footer">
          Footer
        </footer>

      </div>
      
    </>
  )
}

export default App
