import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { DemoIndicator } from './components/ui/DemoIndicatior';
import Login from './pages/Login';
import { DemoModal } from './components/ui/DemoModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <DemoProvider>
        <AppProvider>
          <BrowserRouter>
            <DemoIndicator />
            <DemoModal />
            <Routes>
              <Route path="/" index element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster position="top-right" richColors closeButton />
          </BrowserRouter>
        </AppProvider>
      </DemoProvider>
    </AuthProvider>
  );
}

export default App;
