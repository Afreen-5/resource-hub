// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// // import Dashboard from './components/Dashboard';
// import UserDetail from './components/UserDetail';
// import Signup from './components/SignupForm';
// import Home from './components/Home';

// function App() {
//   return (
//     <Router>
//           <div className="bg-black-gold min-h-screen text-white">
//             <Routes> 
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/home" element={<Home />}  />
//               {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//               <Route path="/users/:id" element={<UserDetail />} />
//             </Routes>
//             </div>
//     </Router>
//   );
// }

// export default App;
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import './index.css';
import Login from './components/Login';
import SignUp from './components/SignupForm';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-black-cardboard bg-cover bg-center')]">
        <main className="flex-1 bg-gray-900 bg-opacity-75 text-white p-8">
          <Routes>
            <Route path="/" element={<Layout><SignUp /></Layout>} />
            <Route path="login" element={<Layout><Login /></Layout>} />
            <Route path="home" element={<Layout><UserDetail /></Layout>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

