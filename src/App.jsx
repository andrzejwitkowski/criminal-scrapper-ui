import React, { useState } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
    import { FaBars, FaMoon, FaSun, FaHome, FaNewspaper } from 'react-icons/fa';
    import { GiHamburgerMenu } from 'react-icons/gi';
    import './index.css';

    const articles = [
      {
        id: 1,
        title: 'Introduction to React',
        content: 'React is a JavaScript library for building user interfaces...',
        date: '2023-10-01'
      },
      {
        id: 2,
        title: 'State Management in React',
        content: 'State management is crucial for building complex React applications...',
        date: '2023-10-05'
      }
    ];

    const Sidebar = ({ isCollapsed, toggleSidebar }) => {
      const location = useLocation();

      return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </button>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/halo-ursynow" className={location.pathname === '/halo-ursynow' ? 'active' : ''}>
                  <FaHome className="icon" />
                  {!isCollapsed && 'Halo Ursynów'}
                </Link>
              </li>
              <li>
                <Link to="/tvn-warszawa" className={location.pathname === '/tvn-warszawa' ? 'active' : ''}>
                  <FaNewspaper className="icon" />
                  {!isCollapsed && 'Tvn Warszawa'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    };

    const ArticleList = () => (
      <div className="article-list">
        {articles.map(article => (
          <div key={article.id} className="article-item">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-date">{article.date}</p>
            <p className="article-snippet">{article.content}</p>
          </div>
        ))}
      </div>
    );

    const App = () => {
      const [isDarkTheme, setIsDarkTheme] = useState(false);
      const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

      const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
      };

      const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      };

      return (
        <Router>
          <div className="app-container">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="main-content">
              <Routes>
                <Route path="/halo-ursynow" element={<ArticleList />} />
                <Route path="/tvn-warszawa" element={<ArticleList />} />
              </Routes>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </Router>
      );
    };

    export default App;
