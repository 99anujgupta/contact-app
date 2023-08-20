import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import User from './features/User';
import AddUser from './features/AddUser';
import EditUser from './features/EditUser';
import ChartsMaps from './features/ChartsMaps';

function App() {
  return (
    <div className='flex '>
      {/* Sidebar */}
      <div className='w-1/4 bg-gray-800 text-white p-4 h-screen sticky top-0'>
        <ul className='space-y-4'>
          <li>
            <Link to='/'>
              <h2 className='text-2xl font-bold mb-4'>Contacts</h2>
            </Link>
          </li>
          <li>
            <Link to='/charts-maps'>
              <h2 className='text-2xl font-bold mb-4'>Charts & Maps</h2>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className='w-3/4 p-4'>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/AddUser' element={<AddUser />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
          <Route path='/charts-maps' element={<ChartsMaps />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
