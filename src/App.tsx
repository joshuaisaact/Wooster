import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './pages/AppLayout';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { DemoIndicator } from './components/ui/DemoIndicatior';
import Login from './pages/Login';
import { DemoModal } from './components/ui/DemoModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner';
import { queryClient } from './lib/query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <ReactQueryDevtools initialIsOpen={false} />
          </AppProvider>
        </DemoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
