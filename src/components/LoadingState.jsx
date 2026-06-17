import React from 'react';
import '../styles/LoadingState.css';

const steps = [
  'Detecting body',
  'Analyzing posture',
  'Computing fitness level',
  'Generating workout plan',
];

export default function LoadingState({ currentStep }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Analyzing your posture…</h2>
      
      <div className="steps-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}
          >
            <div className="step-dot"></div>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <p className="loading-message">This usually takes a few seconds…</p>
    </div>
  );
}
