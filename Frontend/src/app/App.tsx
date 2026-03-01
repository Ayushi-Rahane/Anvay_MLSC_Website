import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { UserLogin } from './pages/UserLogin';
import { UserDashboard } from './pages/UserDashboard';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlockCityPage } from './pages/BlockCityPage';
import { UserLayout } from './components/UserLayout';
import { AdminLayout } from './components/AdminLayout';

// Protected Route Components
const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? <>{children}</> : <Navigate to="/user-login" replace />;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const adminAuth = localStorage.getItem('adminAuth');
  return adminAuth ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedUserRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <ProtectedUserRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/dashboard/rooms"
          element={
            <ProtectedUserRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/blockcity"
          element={
            <ProtectedUserRoute>
              <BlockCityPage />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedUserRoute>
              <UserLayout>
                <LeaderboardPage />
              </UserLayout>
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedUserRoute>
              <UserLayout>
                <ProfilePage />
              </UserLayout>
            </ProtectedUserRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/participants"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/leaderboard"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/scores"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/block-city"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <BlockCityPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}