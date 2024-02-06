// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import './App.css'; // Eğer bu satır zaten varsa tekrar eklemenize gerek yok.

import Navbar from './Navbar';
import Grafik from './Grafik';
import Raporlar from './Raporlar'; // Yeni sayfayı import et


import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="App">
            {user && (
              <>
                <Navbar signOut={signOut} />
                <Routes>
                  <Route path="/Grafik" element={<Grafik />} />
                  <Route path="/Raporlar" element={<Raporlar />} /> {/* Yeni Route ekle */}
                </Routes>
              </>
            )}
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
