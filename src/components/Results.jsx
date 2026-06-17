import React from 'react';
import '../styles/Results.css';

export default function Results({ analysis, onStartSession }) {
  if (!analysis) return null;

  const { fitness_level, detected_issues, workout_plan } = analysis;

  return (
    <div className="results-container">
      {/* Fitness Summary */}
      <div className="fitness-summary">
        <div className={`badge badge-${fitness_level?.toLowerCase()}`}>
          {fitness_level}
        </div>
        <h2>Your Fitness Assessment</h2>
      </div>

      {/* Detected Issues */}
      {detected_issues && detected_issues.length > 0 && (
        <div className="detected-issues">
          <h3>⚠️ Areas to Improve</h3>
          <ul>
            {detected_issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Workout Plan */}
      {workout_plan && (
        <div className="workout-plan">
          <h3>🏋️ Planet Fitness Workout Plan</h3>
          
          {workout_plan.cardio && (
            <section className="plan-section">
              <h4>Cardio Warmup</h4>
              <ul>
                {workout_plan.cardio.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </section>
          )}

          {workout_plan.strength && (
            <section className="plan-section">
              <h4>Strength Training</h4>
              <ul>
                {workout_plan.strength.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </section>
          )}

          {workout_plan.posture_correction && (
            <section className="plan-section">
              <h4>Posture & Correction</h4>
              <ul>
                {workout_plan.posture_correction.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="results-cta">
        <button className="btn-primary btn-large" onClick={onStartSession}>
          🚀 Start Workout Session
        </button>
      </div>
    </div>
  );
}
