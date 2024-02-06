// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Navbar from './Navbar';
import Grafik from './Grafik';

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
