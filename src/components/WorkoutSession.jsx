import React, { useState } from 'react';
import '../styles/WorkoutSession.css';

export default function WorkoutSession({ workoutPlan, onComplete }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [restTimer, setRestTimer] = useState(null);

  const allExercises = [
    ...(workoutPlan?.cardio || []).map(ex => ({ name: ex, category: 'Cardio' })),
    ...(workoutPlan?.strength || []).map(ex => ({ name: ex, category: 'Strength' })),
    ...(workoutPlan?.posture_correction || []).map(ex => ({ name: ex, category: 'Posture' })),
  ];

  const currentExercise = allExercises[currentExerciseIndex];
  const progress = ((completedExercises.length + 1) / allExercises.length) * 100;

  const handleCompleteExercise = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    setRestTimer(30);

    // Auto-advance after rest
    const timer = setTimeout(() => {
      if (currentExerciseIndex < allExercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setRestTimer(null);
      } else {
        onComplete?.();
      }
    }, 30000);

    return () => clearTimeout(timer);
  };

  const handleSkipRest = () => {
    if (currentExerciseIndex < allExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      onComplete?.();
    }
    setRestTimer(null);
  };

  if (!currentExercise) {
    return (
      <div className="session-container">
        <div className="session-complete">
          <h2>🎉 Workout Complete!</h2>
          <p>Great job! You've completed your personalized workout plan.</p>
          <button className="btn-primary btn-large" onClick={onComplete}>
            ✓ Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-container">
      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          Exercise {currentExerciseIndex + 1} of {allExercises.length}
        </p>
      </div>

      {/* Current Exercise Card */}
      <div className="exercise-card">
        <span className="exercise-category">{currentExercise.category}</span>
        <h2>{currentExercise.name}</h2>

        {restTimer ? (
          <div className="rest-timer">
            <div className="timer-display">{restTimer}s</div>
            <p>Rest and recover before next exercise</p>
            <button className="btn-secondary" onClick={handleSkipRest}>
              Skip Rest
            </button>
          </div>
        ) : (
          <div className="exercise-actions">
            <button className="btn-primary btn-large" onClick={handleCompleteExercise}>
              ✓ Complete Exercise
            </button>
            {currentExerciseIndex < allExercises.length - 1 && (
              <button className="btn-secondary" onClick={handleSkipRest}>
                ⏭️ Skip to Next
              </button>
            )}
          </div>
        )}
      </div>

      {/* Completed Exercises List */}
      {completedExercises.length > 0 && (
        <div className="completed-list">
          <h4>Completed</h4>
          <ul>
            {completedExercises.map(idx => (
              <li key={idx}>
                <span className="checkmark">✓</span>
                {allExercises[idx].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
