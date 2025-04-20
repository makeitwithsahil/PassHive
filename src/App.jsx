import './App.css';
import React, { useState, useEffect } from 'react';
import Manager from './components/Manager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DisclaimerPopup from './components/DisclaimerPopup';

function App() {
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("passhive_disclaimer_dismissed");
    if (dismissed) {
      setShowManager(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowManager(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {!showManager && <DisclaimerPopup onDismiss={handleDismiss} />}

        {showManager && (
          <>
            <Navbar />
            <div className="flex-grow">
              <Manager />
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
