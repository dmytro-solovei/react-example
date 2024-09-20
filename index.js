import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { Enter } from './components/Enter/Enter';
import reportWebVitals from './reportWebVitals';

import './components//style.scss';

const App = () => {
  useEffect(() => {
    const root = document.documentElement;

    for (const key in window.theme) {
      if (window.theme.hasOwnProperty(key)) {
        root.style.setProperty(key, window.theme[key]);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Enter />
      </Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
