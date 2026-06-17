import { useState } from 'react';
import { analyzeImage } from './services/api';
import CameraCapture from './components/CameraCapture';
import ImagePreview from './components/ImagePreview';
import LoadingState from './components/LoadingState';
import Results from './components/Results';
import WorkoutSession from './components/WorkoutSession';
import './App.css';

export default function App() {
  // State Management
  const [currentStep, setCurrentStep] = useState('camera'); // camera, preview, loading, results, session, complete
  const [imageFile, setImageFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  // Camera → Captured
  const handleCapturePhoto = (file) => {
    setImageFile(file);
    setCurrentStep('preview');
  };

  // Preview → Analyze
  const handleAnalyze = async () => {
    setCurrentStep('loading');
    setLoadingStep(0);

    try {
      // Simulate step progression
      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingStep(i + 1);
      }

      const result = await analyzeImage(imageFile);
      setAnalysis(result);
      setCurrentStep('results');
    } catch (err) {
      setError(err.message || 'Failed to analyze image');
      setCurrentStep('camera');
    }
  };

  // Retake photo
  const handleRetake = () => {
    setImageFile(null);
    setCurrentStep('camera');
  };

  // Start workout
  const handleStartSession = () => {
    setCurrentStep('session');
  };

  // Complete workout
  const handleCompleteSession = () => {
    setCurrentStep('complete');
  };

  // Restart app
  const handleRestart = () => {
    setImageFile(null);
    setAnalysis(null);
    setLoadingStep(0);
    setError(null);
    setCurrentStep('camera');
  };

  // Render step-based UI
  return (
    <div className="app">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={handleRestart}>✓ Start Over</button>
        </div>
      )}

      {currentStep === 'camera' && (
        <CameraCapture
          onCapture={handleCapturePhoto}
          onError={setError}
        />
      )}

      {currentStep === 'preview' && imageFile && (
        <ImagePreview
          imageFile={imageFile}
          onConfirm={handleAnalyze}
          onRetake={handleRetake}
        />
      )}

      {currentStep === 'loading' && (
        <LoadingState currentStep={loadingStep} />
      )}

      {currentStep === 'results' && analysis && (
        <Results
          analysis={analysis}
          onStartSession={handleStartSession}
        />
      )}

      {currentStep === 'session' && analysis?.workout_plan && (
        <WorkoutSession
          workoutPlan={analysis.workout_plan}
          onComplete={handleCompleteSession}
        />
      )}

      {currentStep === 'complete' && (
        <div className="complete-screen">
          <div className="complete-content">
            <h1>🎉 Great Work!</h1>
            <p>You've completed your personalized workout.</p>
            <p>Come back tomorrow for your next session!</p>
            <button className="btn-primary btn-large" onClick={handleRestart}>
              📸 Analyze Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
