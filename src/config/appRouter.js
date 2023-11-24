import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import AboutPage from '../screens/aboutPage';
import HomePage from '../screens/homePage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
