 // src/App.tsx
 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetailsPage from './pages/UserDetailsPage';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} /> 
        <Route path="/users/:userId" element={<UserDetailsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
