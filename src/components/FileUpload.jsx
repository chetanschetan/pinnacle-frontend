import React, { useState } from 'react';
import API from '../api/axios';

export const FileUpload = ({ onUploadSuccess, label = "Upload File / Document" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    // Prepare Multipart Form Data
    const formData = new FormData();
    // Key 'file' must match backend upload.single('file')
    formData.append('file', selectedFile); 

    try {
      // Hits http://13.233.157.176:5000/api/upload via Vercel proxy
      const response = await API.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.fileUrl) {
        const s3Location = response.data.fileUrl;
        setFileUrl(s3Location);
        
        // Pass S3 public link back to parent form/page
        if (onUploadSuccess) {
          onUploadSuccess(s3Location);
        }
      }
    } catch (err) {
      console.error("S3 Upload Failed:", err);
      setError(err.response?.data?.message || "File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>
        {label}
      </label>

      <input 
        type="file" 
        onChange={handleFileChange} 
        disabled={uploading}
        accept="image/*,application/pdf"
      />

      {uploading && <p style={{ color: '#007bff' }}>Uploading to S3...</p>}
      {error && <p style={{ color: '#dc3545' }}>{error}</p>}

      {/* S3 Uploaded Content Preview */}
      {fileUrl && (
        <div style={{ marginTop: '10px' }}>
          {fileUrl.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
            <img 
              src={fileUrl} 
              alt="Uploaded Preview" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
            />
          ) : (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View Uploaded Document
            </a>
          )}
        </div>
      )}
    </div>
  );
};