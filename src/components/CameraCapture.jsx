import React, { useRef, useEffect, useState } from 'react';
import '../styles/CameraCapture.css';

export default function CameraCapture({ onCapture, onError }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setPermissionDenied(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setPermissionDenied(true);
      onError?.('Camera access denied. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setStreaming(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(blob => {
      if (blob) {
        const file = new File([blob], 'fitness-photo.jpg', { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg', 0.95);
  };

  if (permissionDenied) {
    return (
      <div className="camera-container error">
        <div className="error-message">
          <h2>Camera Access Required</h2>
          <p>Please enable camera permissions to use this app.</p>
          <button onClick={startCamera}>Retry Camera Access</button>
        </div>
      </div>
    );
  }

  return (
    <div className="camera-container">
      <div className="camera-preview">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={streaming ? 'active' : ''}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className="camera-controls">
        <button
          className="btn-primary"
          onClick={capturePhoto}
          disabled={!streaming}
        >
          📸 Take Photo
        </button>
      </div>
    </div>
  );
}
