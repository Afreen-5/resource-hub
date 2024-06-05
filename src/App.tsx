import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import './index.css';
import Login from './components/Login';
import SignUp from './components/SignupForm';
import Layout from './components/Layout';
import Post from './components/Posts';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-black-cardboard bg-cover bg-center')]">
        <main className="flex-1 bg-opacity-75 text-white">
          <Routes>
            <Route path="/" element={<Layout><SignUp /></Layout>} />
            <Route path="login" element={<Layout><Login /></Layout>} />
            <Route path="home" element={<Layout><UserDetail /></Layout>} />
            <Route path="posts" element={<Layout><Post /></Layout>} />
            <Route path='gallery' element={<Layout><Gallery /></Layout>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

