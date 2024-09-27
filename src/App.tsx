import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AppLayout from './pages/AppLayout';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route
          path="/*"
          element={
            <AppProvider>
              <AppLayout />
            </AppProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
