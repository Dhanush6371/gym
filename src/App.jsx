import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Pages
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import ClassDetails from './pages/ClassDetails';
import WorkoutDetails from './pages/WorkoutDetails';
import ExerciseDetails from './pages/ExerciseDetails';
import Notifications from './pages/Notifications';
import Attendance from './pages/Attendance';
import Membership from './pages/Membership';
import Settings from './pages/Settings';
import Social from './pages/Social';
import Battles from './pages/Battles';
import PersonalRecords from './pages/PersonalRecords';
import TrainerDashboard from './pages/TrainerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import MoodSelector from './pages/MoodSelector';
import WorkoutReels from './pages/WorkoutReels';

// Layouts
import MainLayout from './layouts/MainLayout';
import DesktopLayout from './layouts/DesktopLayout';

// Hooks
import { useIsDesktop } from './hooks/useMediaQuery';

function AppRoutes() {
  const { currentUser } = useApp();
  const isDesktop = useIsDesktop();
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown in this session
    return !sessionStorage.getItem('splashShown');
  });

  useEffect(() => {
    if (showSplash && !currentUser) {
      // Show splash for 3 seconds, then hide it
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash, currentUser]);

  // Show splash screen on first load
  if (showSplash && !currentUser) {
    return (
      <Routes>
        <Route path="*" element={<SplashScreen />} />
      </Routes>
    );
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Choose layout based on screen size
  const Layout = isDesktop ? DesktopLayout : MainLayout;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="profile" element={<Profile />} />
        <Route path="class/:id" element={<ClassDetails />} />
        <Route path="workout/:id" element={<WorkoutDetails />} />
        <Route path="exercise/:id" element={<ExerciseDetails />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="membership" element={<Membership />} />
        <Route path="settings" element={<Settings />} />
        <Route path="social" element={<Social />} />
        <Route path="battles" element={<Battles />} />
        <Route path="records" element={<PersonalRecords />} />
        <Route path="mood" element={<MoodSelector />} />
        <Route path="reels" element={<WorkoutReels />} />
        {currentUser.role === 'trainer' && (
          <Route path="trainer" element={<TrainerDashboard />} />
        )}
        {currentUser.role === 'owner' && (
          <Route path="owner" element={<OwnerDashboard />} />
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
}

export default App;
