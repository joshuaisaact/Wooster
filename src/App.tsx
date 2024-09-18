import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AppLayout from './pages/AppLayout';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:4000';

function App() {
  const [trip, setTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchTrips() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/trip`);
        const data = await res.json();
        setTrip(data);
      } catch (error) {
        alert(`There was an error loading data ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="summary" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
