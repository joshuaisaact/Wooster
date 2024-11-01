import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage';
import AppLayout from './pages/AppLayout';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route
            path="/*"
            element={
              <AppProvider>
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              </AppProvider>
            }
          />
        </Routes>
        <Toaster
          position="top-right"
          richColors
          closeButton
          // Optional: customize theme and behavior
          // theme="dark"
          // duration={4000}
          // expand={false}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
