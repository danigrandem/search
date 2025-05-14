import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen';
import ShowDetail from './screens/ShowDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
