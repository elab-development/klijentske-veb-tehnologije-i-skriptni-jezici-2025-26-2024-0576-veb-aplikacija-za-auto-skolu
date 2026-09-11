import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Lessons from './pages/Lessons';
import Profile from './pages/Profile';
import ScheduleLesson from './pages/ScheduleLesson';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route
              path='/lessons'
              element={
                <ProtectedRoute>
                  <Lessons />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/schedule'
              element={
                <ProtectedRoute>
                  <ScheduleLesson />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 2800,
          style: {
            borderRadius: '12px',
            color: '#0b1d3a',
            fontWeight: 600,
          },
        }}
      />
    </>
  );
}

export default App;
