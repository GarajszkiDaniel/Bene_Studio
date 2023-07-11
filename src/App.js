import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import store from './redux/store';
import './App.css';
import PageTwo from './Components/PageTwo';
import PageOne from './Components/PageOne';
import PageThree from './Components/PageThree';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/page-two" element={<PageTwo />} />
            <Route path="/page-three" element={<PageThree />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
