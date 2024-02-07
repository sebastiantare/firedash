import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Dashboard } from './pages/Dashboard';

export default function App() {
    return (
        <div className="flex justify-center min-h-screen bg-[#001233]">
            <div className="max-w-[1440px] w-full">
                <Dashboard />
            </div>
        </div>
    );
}
