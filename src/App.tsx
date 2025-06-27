import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SwapDemo from './pages/SwapDemo';
import BridgeDemo from './pages/BridgeDemo';
import FastMixerDemo from './pages/FastMixerDemo';
import FullyMixerDemo from './pages/FullyMixerDemo';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/swap" element={<SwapDemo />} />
            <Route path="/bridge" element={<BridgeDemo />} />
            <Route path="/fast-mixer" element={<FastMixerDemo />} />
            <Route path="/fully-mixer" element={<FullyMixerDemo />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
