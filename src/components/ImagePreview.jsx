import React, { useEffect, useState } from 'react';
import '../styles/ImagePreview.css';

export default function ImagePreview({ imageFile, onConfirm, onRetake }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target.result);
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="preview-container">
      <div className="preview-image">
        {preview && <img src={preview} alt="Captured fitness photo" />}
      </div>
      <div className="preview-controls">
        <button className="btn-secondary" onClick={onRetake}>
          ↺ Retake Photo
        </button>
        <button className="btn-primary" onClick={onConfirm}>
          ✓ Analyze
        </button>
      </div>
    </div>
  );
}
