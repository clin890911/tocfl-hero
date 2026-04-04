import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import ListeningPage from './pages/ListeningPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import FlashcardPage from './pages/FlashcardPage';
import DailyChallengePage from './pages/DailyChallengePage';
import AnalyticsPage from './pages/AnalyticsPage';
import SmartReviewPage from './pages/SmartReviewPage';
import ProfilePage from './pages/ProfilePage';
import ErrorBoundary from './components/ErrorBoundary';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🏆</div>
          <p className="text-gray-500 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/" />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/daily" element={<DailyChallengePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/review" element={<SmartReviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <GameProvider>
              <AppContent />
            </GameProvider>
          </AuthProvider>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
