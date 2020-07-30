import React from 'react';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import Router from './routes';

const App = () => {
  return (
    <>
      <AppHeader />
        <main className="container">
          <Router />
        </main>
      <AppFooter />
    </>
  );
}

export default App;
