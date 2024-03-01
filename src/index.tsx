// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const container = document.getElementById('app-root')!;
const root = (ReactDOM as any).createRoot(container);
root.render(<App />);
